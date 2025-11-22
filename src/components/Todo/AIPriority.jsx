import { useEffect, useState, useRef } from "react";
import { getTodoPriorityByAI } from "../../utils/api";
import "./AIPriority.style.css";

// 투두를 월별로 필터링하는 함수
const getTodosByMonth = (todos, year, month) => {
  return todos.filter((todo) => {
    if (!todo.startDate) return false;

    const startDate = new Date(todo.startDate);
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();

    if (todo.dateType === "range" && todo.dueDate) {
      const dueDate = new Date(todo.dueDate);
      const dueYear = dueDate.getFullYear();
      const dueMonth = dueDate.getMonth();

      const isStartInMonth = startYear === year && startMonth === month;
      const isDueInMonth = dueYear === year && dueMonth === month;

      const targetDate = new Date(year, month, 1);
      const isMonthInRange = startDate <= targetDate && targetDate <= dueDate;

      return isStartInMonth || isDueInMonth || isMonthInRange;
    } else {
      return startYear === year && startMonth === month;
    }
  });
};

const getAvailableMonths = (todos) => {
  const monthSet = new Set();

  todos.forEach((todo) => {
    if (!todo.startDate) return;

    const startDate = new Date(todo.startDate);
    const startKey = `${startDate.getFullYear()}-${startDate.getMonth()}`;
    monthSet.add(startKey);

    if (todo.dateType === "range" && todo.dueDate) {
      const dueDate = new Date(todo.dueDate);
      const dueKey = `${dueDate.getFullYear()}-${dueDate.getMonth()}`;
      monthSet.add(dueKey);

      const currentDate = new Date(startDate);
      currentDate.setDate(1);

      while (currentDate <= dueDate) {
        const key = `${currentDate.getFullYear()}-${currentDate.getMonth()}`;
        monthSet.add(key);
        currentDate.setMonth(currentDate.getMonth() + 1);
      }
    }
  });

  return Array.from(monthSet)
    .map((key) => {
      const [year, month] = key.split("-").map(Number);
      return { year, month, key };
    })
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
};

const groupByDate = (todos) => {
  const groups = {};

  todos.forEach((todo) => {
    if (!todo.startDate) return;

    const startDate = new Date(todo.startDate);
    startDate.setHours(0, 0, 0, 0);

    if (todo.dateType === "range" && todo.dueDate) {
      const dueDate = new Date(todo.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      const currentDate = new Date(startDate);

      while (currentDate <= dueDate) {
        const dateKey = currentDate.toISOString().split("T")[0];

        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }
        groups[dateKey].push(todo);

        currentDate.setDate(currentDate.getDate() + 1);
      }
    } else {
      const dateKey = startDate.toISOString().split("T")[0];
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(todo);
    }
  });

  return groups;
};

const getDateHash = (todos) => {
  const hashParts = todos
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((t) => {
      return JSON.stringify({
        id: t.id,
        title: t.title || "",
        importance: t.importance || 0,
        dueDate: t.dueDate || "",
        startDate: t.startDate || "",
        description: t.description || "",
        estimatedTime: t.estimatedTime || 0,
        category: t.category || "",
      });
    });

  return hashParts.join("||");
};

const invalidateCacheForTodo = (cache, todoId, startDate) => {
  if (startDate && cache[startDate]) {
    const cached = cache[startDate];
    if (cached && cached.result) {
      const hasTodo = cached.result.some((item) => item.id === todoId);
      if (hasTodo) {
        delete cache[startDate];
      }
    }
  }
};

const cleanupOldCache = (cache, maxDays = 90) => {
  const now = new Date();
  const keysToDelete = [];

  for (const dateKey in cache) {
    try {
      const date = new Date(dateKey);
      const daysDiff = Math.floor((now - date) / (1000 * 60 * 60 * 24));

      if (daysDiff > maxDays) {
        keysToDelete.push(dateKey);
      }
    } catch {
      keysToDelete.push(dateKey);
    }
  }

  keysToDelete.forEach((key) => {
    delete cache[key];
  });
};

const formatMonthYear = (year, month) => {
  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  return `${year}년 ${monthNames[month]}`;
};

const AIPriority = ({ todos = [] }) => {
  const [dailyPriorities, setDailyPriorities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [rawData, setRawData] = useState(null);

  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

  const availableMonths = getAvailableMonths(todos || []);

  const cacheRef = useRef({});
  const prevTodosRef = useRef([]);

  useEffect(() => {
    const cache = cacheRef.current;
    const prevTodos = prevTodosRef.current;

    if (prevTodos.length > 0) {
      const currentTodoIds = new Set(todos.map((t) => t.id));

      prevTodos.forEach((prevTodo) => {
        if (!currentTodoIds.has(prevTodo.id)) {
          invalidateCacheForTodo(cache, prevTodo.id, prevTodo.startDate);
        }
      });

      todos.forEach((currentTodo) => {
        const prevTodo = prevTodos.find((t) => t.id === currentTodo.id);
        if (prevTodo) {
          const prevHash = getDateHash([prevTodo]);
          const currentHash = getDateHash([currentTodo]);

          if (prevHash !== currentHash) {
            invalidateCacheForTodo(
              cache,
              currentTodo.id,
              currentTodo.startDate
            );
          }
        }
      });
    }

    prevTodosRef.current = [...todos];
    cleanupOldCache(cache, 90);

    if (!todos || todos.length === 0) {
      setDailyPriorities({});
      setIsLoading(false);
      return;
    }

    let todosToProcess = getTodosByMonth(todos, selectedYear, selectedMonth);

    if (todosToProcess.length === 0) {
      setDailyPriorities({});
      setIsLoading(false);
      return;
    }

    const grouped = groupByDate(todosToProcess);

    if (Object.keys(grouped).length === 0) {
      setDailyPriorities({});
      setIsLoading(false);
      return;
    }

    const fetchAI = async () => {
      setIsLoading(true);
      setAiError(null);
      const results = {};

      try {
        for (const day in grouped) {
          const list = grouped[day];

          if (list.length === 0) continue;

          const dateHash = getDateHash(list);
          const cached = cache[day];

          if (cached && cached.hash === dateHash) {
            results[day] = cached.result;
          } else {
            const aiResult = await getTodoPriorityByAI(list);

            if (Array.isArray(aiResult)) {
              const sortedResult = aiResult.sort((a, b) => a.rank - b.rank);
              results[day] = sortedResult;

              cache[day] = {
                hash: dateHash,
                result: sortedResult,
              };
            } else {
              const fallbackResult = list.map((todo, idx) => ({
                id: todo.id,
                rank: idx + 1,
                level: "medium",
                reason: "AI 분석 실패",
              }));
              results[day] = fallbackResult;

              cache[day] = {
                hash: dateHash,
                result: fallbackResult,
              };
            }
          }
        }

        setDailyPriorities(results);
        setRawData(results);
      } catch (err) {
        setAiError(`AI 우선순위 추천 실패: ${err.message}`);

        const fallbackResults = {};
        for (const day in grouped) {
          const list = grouped[day];
          fallbackResults[day] = list.map((todo, idx) => ({
            id: todo.id,
            rank: idx + 1,
            level: "medium",
            reason: "기본 순서",
          }));
        }
        setDailyPriorities(fallbackResults);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAI();
  }, [todos, selectedYear, selectedMonth]);

  const handleMonthChange = (year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  if (isLoading) {
    return (
      <div className="ai-priority-container">
        <div className="ai-priority-header">
          <h3 className="ai-priority-title">🌻 날짜별 AI 우선순위 🌻</h3>
          {availableMonths.length > 0 && (
            <div className="month-filter">
              <label htmlFor="month-select">월 선택: </label>
              <select
                id="month-select"
                value={`${selectedYear}-${selectedMonth}`}
                onChange={(e) => {
                  const [year, month] = e.target.value.split("-").map(Number);
                  handleMonthChange(year, month);
                }}
                className="month-select"
              >
                {availableMonths.map(({ year, month, key }) => (
                  <option key={key} value={key}>
                    {formatMonthYear(year, month)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="empty-message">AI 분석 중...</div>
      </div>
    );
  }

  if (aiError) {
    return (
      <div className="ai-priority-container">
        <div className="ai-priority-header">
          <h3 className="ai-priority-title">🌻 날짜별 AI 우선순위 🌻</h3>
          {availableMonths.length > 0 && (
            <div className="month-filter">
              <label htmlFor="month-select">월 선택: </label>
              <select
                id="month-select"
                value={`${selectedYear}-${selectedMonth}`}
                onChange={(e) => {
                  const [year, month] = e.target.value.split("-").map(Number);
                  handleMonthChange(year, month);
                }}
                className="month-select"
              >
                {availableMonths.map(({ year, month, key }) => (
                  <option key={key} value={key}>
                    {formatMonthYear(year, month)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="error-box">{aiError}</div>
        {rawData && (
          <div className="debug-box">
            <strong>원본 데이터:</strong>
            <pre>{JSON.stringify(rawData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }

  const sortedDays = Object.keys(dailyPriorities).sort();

  if (sortedDays.length === 0) {
    return (
      <div className="ai-priority-container">
        <div className="ai-priority-header">
          <h3 className="ai-priority-title">🌻 날짜별 AI 우선순위 🌻</h3>
          {availableMonths.length > 0 && (
            <div className="month-filter">
              <label htmlFor="month-select">월 선택: </label>
              <select
                id="month-select"
                value={`${selectedYear}-${selectedMonth}`}
                onChange={(e) => {
                  const [year, month] = e.target.value.split("-").map(Number);
                  handleMonthChange(year, month);
                }}
                className="month-select"
              >
                {availableMonths.map(({ year, month, key }) => (
                  <option key={key} value={key}>
                    {formatMonthYear(year, month)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="empty-message">
          {formatMonthYear(selectedYear, selectedMonth)}에 할 일이 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="ai-priority-container">
      <div className="ai-priority-header">
        <h3 className="ai-priority-title">
          🌻 {formatMonthYear(selectedYear, selectedMonth)} AI 우선순위 🌻
        </h3>
        {availableMonths.length > 0 && (
          <div className="month-filter">
            <label htmlFor="month-select">월 선택: </label>
            <select
              id="month-select"
              value={`${selectedYear}-${selectedMonth}`}
              onChange={(e) => {
                const [year, month] = e.target.value.split("-").map(Number);
                handleMonthChange(year, month);
              }}
              className="month-select"
            >
              {availableMonths.map(({ year, month, key }) => (
                <option key={key} value={key}>
                  {formatMonthYear(year, month)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {sortedDays.map((day) => {
        const dayItems = dailyPriorities[day] || [];

        return (
          <div key={day} className="ai-day-block">
            <h4 className="ai-day-title">{day}</h4>

            {dayItems.length === 0 ? (
              <div className="empty-message">해당 날짜의 할 일이 없습니다.</div>
            ) : (
              dayItems.map((item, index) => {
                const todo = todos.find((t) => t.id === item.id);
                const title = todo ? todo.title : "삭제된 항목";
                const level = item.level || "medium";
                const rank = item.rank || index + 1;
                const reason = item.reason || "";

                return (
                  <div key={item.id || index} className="ai-priority-item">
                    <div className="priority-number">{rank}</div>
                    <div className="priority-task">{title}</div>
                    <div className={`priority-badge priority-${level}`}>
                      {level === "high"
                        ? "높음"
                        : level === "medium"
                        ? "보통"
                        : "낮음"}
                    </div>
                    {reason && <div className="priority-reason">{reason}</div>}
                  </div>
                );
              })
            )}
          </div>
        );
      })}

      {/* {import.meta.env.DEV && rawData && (
        <details className="debug-box">
          <summary>🔍 디버그: 원본 데이터 보기</summary>
          <pre>{JSON.stringify(rawData, null, 2)}</pre>
        </details>
      )} */}
    </div>
  );
};

export default AIPriority;
