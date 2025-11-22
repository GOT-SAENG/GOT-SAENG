import React from "react";
import "./ScheduleModal.style.css";

const ScheduleModal = ({ isOpen, onClose, date, schedules }) => {
  if (!isOpen || !date) return null;

  const formattedDate = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 닫기 버튼 */}
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* 날짜 헤더 */}
        <h2 className="modal-date">{formattedDate}</h2>

        {/* 일정 리스트 */}
        <div className="modal-schedule-list">
          {schedules.map((item) => (
            <div
              key={item.id}
              className={`schedule-card importance-${item.importance}`}
            >
              {item.status === "completed" && (
                <span className="schedule-check">✔</span>
              )}
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;
