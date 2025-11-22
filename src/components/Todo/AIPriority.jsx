// src/components/Todo/AIPriority.jsx
import { useEffect, useState } from "react";
import { getTodoPriorityByAI } from "../../utils/api";
import "./AIPriority.style.css";

// 특정 년/월의 할 일 필터링
const getTodosByMonth = (todos, year, month) => {
  return todos.filter((todo) => {
    if (!todo.startDate) return false;
    const d = new Date(todo.startDate);
    return d.getFullYear() === year && d.getMonth() === month;
  });
};

// todos에서 사용 가능한 년/월 목록 추출
const getAvailableMonths = (todos) => {
  const monthSet = new Set();
  todos.forEach((todo) => {
    if (todo.startDate) {
      const d = new Date(todo.startDate);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      monthSet.add(key);
    }
  });

  return Array.from(monthSet)
    .map((key) => {
      const [year, month] = key.split("-").map(Number);
      return { year, month, key };
    })
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year; // 최신 년도 먼저
      return b.month - a.month; // 최신 월 먼저
    });
};

// 날짜별 그룹 묶기
const groupByDate = (todos) => {
  const groups = {};
  todos.forEach((todo) => {
    const day = todo.startDate;
    if (!groups[day]) groups[day] = [];
    groups[day].push(todo);
  });
  return groups;
};

// 년/월을 한국어로 표시
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

  // 현재 선택된 년/월 상태
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());

  // 사용 가능한 월 목록
  const availableMonths = getAvailableMonths(todos || []);

  useEffect(() => {
    console.log("🔍 AIPriority - todos 받음:", todos);
    console.log("📅 선택된 년/월:", selectedYear, selectedMonth);

    if (!todos || todos.length === 0) {
      console.log("⚠️ AIPriority - todos가 없거나 빈 배열입니다.");
      setDailyPriorities({});
      setIsLoading(false);
      return;
    }

    // 선택된 년/월의 할 일 필터링
    let todosToProcess = getTodosByMonth(todos, selectedYear, selectedMonth);
    console.log("📅 필터링된 할 일:", todosToProcess);

    // 선택된 월에 할 일이 없으면 빈 상태 표시
    if (todosToProcess.length === 0) {
      console.log("⚠️ 선택된 월에 할 일이 없습니다.");
      setDailyPriorities({});
      setIsLoading(false);
      return;
    }

    const grouped = groupByDate(todosToProcess);
    console.log("📦 날짜별 그룹:", grouped);

    // 그룹이 없으면 종료
    if (Object.keys(grouped).length === 0) {
      console.log("⚠️ 그룹이 없습니다.");
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

          // 빈 배열이면 건너뛰기
          if (list.length === 0) continue;

          console.log(`📅 ${day} 날짜의 할 일:`, list);

          const aiResult = await getTodoPriorityByAI(list);
          console.log(`✅ ${day} AI 결과:`, aiResult);

          // AI 결과가 배열인지 확인
          if (Array.isArray(aiResult)) {
            results[day] = aiResult.sort((a, b) => a.rank - b.rank);
          } else {
            console.warn(
              `⚠️ ${day} 날짜의 AI 결과가 배열이 아닙니다:`,
              aiResult
            );
            // 기본값 설정
            results[day] = list.map((todo, idx) => ({
              id: todo.id,
              rank: idx + 1,
              level: "medium",
              reason: "AI 분석 실패",
            }));
          }
        }

        setDailyPriorities(results);
        setRawData(results);
      } catch (err) {
        console.error("❌ AI 에러:", err);
        setAiError(`AI 우선순위 추천 실패: ${err.message}`);

        // 에러 발생 시 기본값으로 표시
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
  }, [todos, selectedYear, selectedMonth]); // selectedYear, selectedMonth 의존성 추가

  // 월 변경 핸들러
  const handleMonthChange = (year, month) => {
    setSelectedYear(year);
    setSelectedMonth(month);
  };

  // 로딩 중
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

  // 에러 발생
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

  // 결과가 없을 때
  const sortedDays = Object.keys(dailyPriorities).sort();
  console.log("📊 dailyPriorities:", dailyPriorities);
  console.log("📊 sortedDays:", sortedDays);

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

  // 결과 표시
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

      {/* 디버깅용: 원본 데이터 표시 (개발 모드일 때만) */}
      {import.meta.env.DEV && rawData && (
        <details className="debug-box">
          <summary>🔍 디버그: 원본 데이터 보기</summary>
          <pre>{JSON.stringify(rawData, null, 2)}</pre>
        </details>
      )}
    </div>
  );
};

export default AIPriority;
