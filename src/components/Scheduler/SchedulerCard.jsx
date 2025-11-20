import React from "react";
import "./SchedulerCard.style.css";

const SchedulerCard = ({ day, type, year, month }) => {
  const today = new Date();
  const isToday =
    today.getFullYear() === year &&
    today.getMonth() + 1 === month &&
    today.getDate() === day;

  const isNextMonthFirstDay = type === "next" && day === 1;

  // nextMonth 구하기
  const nextMonth = month === 12 ? 1 : month + 1;

  return (
    <div className={`day-box ${type} ${isToday ? "today" : ""}`}>
      {!isNextMonthFirstDay ? (
        <span className="day-number">{day}</span>
      ) : (
        <span className="next-month-label">{nextMonth}월 {day}일</span>
      )}
    </div>
  );
};

export default SchedulerCard;
