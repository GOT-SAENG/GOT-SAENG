import { useState } from "react";
import "./TodoModal.style.css";

function TodoModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    startTime: "",
    description: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.startDate) {
      onSave(formData);
      setFormData({
        title: "",
        startDate: "",
        startTime: "",
        description: "",
      });
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <h2 className="modal-title">TODO 추가</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              제목 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="할 일을 입력하세요"
              추
            />
          </div>

          <div className="form-date-time">
            <div className="form-group">
              <label htmlFor="startDate" className="form-label">
                날짜 <span className="required">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="startTime" className="form-label">
                시간
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              설명
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
              placeholder="상세 설명을 입력하세요 (선택사항)"
            />
          </div>

          <button type="submit" className="modal-submit-btn">
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default TodoModal;
