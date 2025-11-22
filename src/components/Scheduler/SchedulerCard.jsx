import React from "react";
import "./SchedulerCard.style.css";

const SchedulerCard = ({ day, type, year, month, schedules, allCompleted, onOpenModal }) => {
  const today = new Date();
  const isToday =
    today.getFullYear() === year &&
    today.getMonth() + 1 === month &&
    today.getDate() === day;

  const cellDate = new Date(year, month - 1, day);
  const cellMonth = cellDate.getMonth() + 1;
  const cellDay = cellDate.getDate();
  const isWeekend = cellDate.getDay() === 0 || cellDate.getDay() === 6;

  const isOtherMonth = cellMonth !== month;

  return (
    <div
      className={`day-box ${type} ${isToday ? "today" : ""}`}
      onClick={() => {
        if (schedules.length > 0) {
          onOpenModal({ date: cellDate, schedules });
        }
      }}
    >
      {allCompleted && <div className="fire-icon">🔥</div>}

      <div className="date-area">
        {type === "current" ? (
          <span className="day-number">{cellDay}</span>
        ) : (
          <span className="next-month-label">
            {cellMonth}월 {cellDay}일
          </span>
        )}
      </div>

      <div className="schedule-area">
        <ul className="schedule-list">
          {schedules.slice(0, 2).map((item) => (
            <li
              key={item.id}
              className={`schedule-item importance-${item.importance}`}
            >
              {item.status === "completed" && (
                <span className="schedule-check">✔</span>
              )}
              {item.title}
            </li>
          ))}
          {schedules.length > 2 && (
            <li
              className={`schedule-more ${isWeekend ? "weekend" : "weekday"}`}
            >
              +{schedules.length - 2}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SchedulerCard;
