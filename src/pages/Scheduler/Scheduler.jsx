import React, { useState } from "react";
import "./Scheduler.style.css";
import { Container } from "react-bootstrap";
import SchedulerCard from "./components/SchedulerCard";

const Scheduler = () => {
  const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const currentMonthLastDay = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const prevMonthLastDay = new Date(year, month - 1, 0).getDate();

  // 현재 달 날짜 배열
  const currentDays = Array.from({ length: currentMonthLastDay }, (_, i) => ({
    day: i + 1,
    type: "current",
  }));

  // 첫 주 앞 빈칸을 지난달 날짜로 채우기
  const prevDays = Array.from({ length: firstDayOfWeek }, (_, i) => ({
    day: prevMonthLastDay - firstDayOfWeek + i + 1,
    type: "prev",
  }));

  // 다음 달로 채워야 하는 칸 개수 계산 (총 42칸 기준)
  const totalCells = 42; // 6주 * 7일
  const nextDaysCount = totalCells - (prevDays.length + currentDays.length);

  const nextDays = Array.from({ length: nextDaysCount }, (_, i) => ({
    day: i + 1,
    type: "next",
  }));

  // 최종 달력 데이터
  const days = [...prevDays, ...currentDays, ...nextDays];

  const minusMonth = () =>
    setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const plusMonth = () =>
    setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  const goToToday = () => setDate(new Date());

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="scheduler-background">
      <Container>
        {/* 년,월 박스 */}
        <div className="year-month-box">
          <div>아이콘</div>
          <div>
            <button onClick={minusMonth}>◀</button>
            {year}년 {month}월
            <button onClick={plusMonth}>▶</button>
          </div>
          <button onClick={goToToday}>오늘</button>
        </div>

        {/* 요일 헤더 */}
        <div className="week-header">
          {weekDays.map((day) => (
            <div key={day} className="week-day">
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 표시 */}
        <div className="calendar-grid">
          {days.map((d, i) => (
            <SchedulerCard
              key={i}
              day={d.day}
              type={d.type}
              year={year}
              month={month}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Scheduler;
