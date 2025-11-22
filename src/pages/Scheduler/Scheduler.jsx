import React, { useState } from "react";
import "./Scheduler.style.css";
import { Container } from "react-bootstrap";
import SchedulerCard from "../../components/Scheduler/SchedulerCard";
import Header from "../../components/common/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useTodosQuery } from "../../hooks/useTodos";
import ScheduleModal from "../../components/Scheduler/ScheduleModal";

const Scheduler = () => {
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    date: null,
    schedules: [],
  });

  const handleOpenModal = ({ date, schedules }) => {
    setModalInfo({
      isOpen: true,
      date,
      schedules,
    });
  };

  const handleCloseModal = () => {
    setModalInfo({ ...modalInfo, isOpen: false });
  };

  const { data: todos, isLoading, isError } = useTodosQuery();

  // 일정 데이터 (범위 일정 포함)
  const scheduleData = React.useMemo(() => {
    if (!todos) return {};

    const result = {};

    todos.forEach((todo) => {
      if (!todo.startDate) return;

      const start = new Date(todo.startDate);
      const end = todo.dueDate ? new Date(todo.dueDate) : start;
      const current = new Date(start);

      while (current <= end) {
        const key = current.toISOString().slice(0, 10);

        if (!result[key]) result[key] = [];
        result[key].push({
          id: todo.id,
          title: todo.title,
          status: todo.status,
          importance: todo.importance, // <-- 추가!
          isRange: todo.dateType === "range",
          isStart: current.getTime() === start.getTime(),
          isEnd: current.getTime() === end.getTime(),
        });

        current.setDate(current.getDate() + 1);
      }
    });

    return result;
  }, [todos]);

  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const currentMonthLastDay = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const prevMonthLastDay = new Date(year, month - 1, 0).getDate();

  const currentDays = Array.from({ length: currentMonthLastDay }, (_, i) => ({
    day: i + 1,
    type: "current",
  }));

  const prevDays = Array.from({ length: firstDayOfWeek }, (_, i) => ({
    day: prevMonthLastDay - firstDayOfWeek + i + 1,
    type: "prev",
  }));

  const totalCells = 42;
  const nextDaysCount = totalCells - (prevDays.length + currentDays.length);

  const nextDays = Array.from({ length: nextDaysCount }, (_, i) => ({
    day: i + 1,
    type: "next",
  }));

  const days = [...prevDays, ...currentDays, ...nextDays];

  const minusMonth = () =>
    setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));

  const plusMonth = () =>
    setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

  const goToToday = () => setDate(new Date());

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="scheduler-page">
      <Header />
      <Container>
        {/* 로딩 및 에러 메시지 - UI를 막지 않음 */}
        {isLoading && (
          <div className="schedule-info-text">일정 불러오는 중...</div>
        )}
        {isError && (
          <div className="schedule-info-text">일정 불러오기 실패</div>
        )}
        {/* 년/월 컨트롤 */}
        <div className="year-month-box">
          <div className="ym-left calender-icon">
            <FontAwesomeIcon
              icon={faCalendar}
              size="2x"
              style={{ color: "#134a2f" }}
            />
          </div>

          <div className="ym-center">
            <button className="btn1" onClick={minusMonth}>
              ◀
            </button>
            <h2 className="ym-text">
              {year}년 {month}월
            </h2>
            <button className="btn1" onClick={plusMonth}>
              ▶
            </button>
          </div>

          <div className="ym-right">
            <button className="btn2" onClick={goToToday}>
              오늘
            </button>
          </div>
        </div>

        {/* 요일 헤더 */}
        <div className="week-header">
          {weekDays.map((day) => (
            <div key={day} className="week-day">
              {day}
            </div>
          ))}
        </div>

        {/* 달력 날짜 */}
        <div className="calendar-grid">
          {days.map((d, i) => {
            let cellYear = year;
            let cellMonth = month;

            if (d.type === "prev") {
              cellMonth = month === 1 ? 12 : month - 1;
              if (month === 1) cellYear = year - 1;
            }

            if (d.type === "next") {
              cellMonth = month === 12 ? 1 : month + 1;
              if (month === 12) cellYear = year + 1;
            }

            const dateKey = `${cellYear}-${String(cellMonth).padStart(
              2,
              "0"
            )}-${String(d.day).padStart(2, "0")}`;

            const dateSchedules = scheduleData[dateKey] || [];

            const allCompleted =
              dateSchedules.length > 0 &&
              dateSchedules.every((s) => s.status === "completed");

            return (
              <SchedulerCard
                key={i}
                day={d.day}
                type={d.type}
                year={cellYear}
                month={cellMonth}
                schedules={dateSchedules}
                allCompleted={allCompleted}
                onOpenModal={handleOpenModal}
              />
            );
          })}
        </div>
        <ScheduleModal
          isOpen={modalInfo.isOpen}
          onClose={handleCloseModal}
          date={modalInfo.date}
          schedules={modalInfo.schedules}
        />
      </Container>
    </div>
  );
};

export default Scheduler;
