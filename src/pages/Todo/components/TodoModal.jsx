import { useState } from "react";
import "./TodoModal.style.css";

// 초기값 상수
const INITIAL_FORM = {
  title: "",
  description: "",
  priority: "2",
  dateType: "single",
  startDate: "",
  dueDate: null,
  estimatedTime: "",
  alarmTime: "", // alarmTime만 사용 (값이 있으면 알람 켜짐, 없으면 꺼짐)
};

function TodoModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState(INITIAL_FORM);

  if (!isOpen) return null;

  // 폼 초기화 함수
  const resetForm = () => setFormData(INITIAL_FORM);

  // 제출
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.startDate) return;

    if (formData.dateType === "range" && !formData.dueDate) {
      alert("마감일을 입력해주세요.");
      return;
    }

    const submitData = {
      ...formData,
      dueDate: formData.dateType === "single" ? null : formData.dueDate,
    };

    onSave(submitData);
    resetForm();
    onClose();
  };

  // 🔹 공통 change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // 날짜 타입 바뀔 때 dueDate 초기화
    if (name === "dateType") {
      setFormData((prev) => ({
        ...prev,
        dateType: value,
        dueDate: value === "single" ? null : prev.dueDate,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 알람 On/Off (alarmTime으로 처리)
  const handleToggleAlarm = () => {
    setFormData((prev) => ({
      ...prev,
      // alarmTime이 있으면 빈 문자열로 (알람 끄기)
      // alarmTime이 없으면 기본값 "08:50"으로 (알람 켜기 - 시작일 09:00의 10분 전)
      alarmTime: prev.alarmTime ? "" : "08:50",
    }));
  };

  // 🔹 취소 버튼
  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        <h2 className="modal-title">TODO 등록</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* 제목 */}
          <div className="form-group">
            <label className="form-label">
              제목 <span className="required">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="할 일을 입력하세요"
              required
            />
          </div>

          {/* 상세내용 */}
          <div className="form-group">
            <label className="form-label">상세내용</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              rows="4"
              placeholder="상세 내용을 입력하세요"
            />
          </div>

          {/* 중요도 */}
          <div className="form-group">
            <label className="form-label">중요도</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-input"
            >
              <option value="1">낮음</option>
              <option value="2">중간</option>
              <option value="3">높음</option>
              <option value="4">매우 높음</option>
            </select>
          </div>

          {/* 날짜 타입 */}
          <div className="form-group">
            <label className="form-label">일정 유형</label>
            <select
              name="dateType"
              value={formData.dateType}
              onChange={handleChange}
              className="form-input"
            >
              <option value="single">하루</option>
              <option value="range">기간</option>
            </select>
          </div>

          {/* 시작일 / 날짜 기간 */}
          {formData.dateType === "single" ? (
            <div className="form-group">
              <label className="form-label">
                시작일 <span className="required">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          ) : (
            <div className="form-group">
              <div className="form-date-range">
                <div className="form-date-item">
                  <label className="form-date-label">시작일</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-date-item">
                  <label className="form-date-label">마감일</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate || ""}
                    onChange={handleChange}
                    className="form-input"
                    min={formData.startDate}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* 예상 시간 */}
          <div className="form-group">
            <label className="form-label">예상소요시간</label>
            <select
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">선택하세요</option>
              <option value="15">15분</option>
              <option value="30">30분</option>
              <option value="45">45분</option>
              <option value="60">1시간</option>
              <option value="90">1시간 30분</option>
              <option value="120">2시간</option>
              <option value="180">3시간</option>
              <option value="240">4시간</option>
              <option value="300">5시간</option>
              <option value="480">8시간</option>
            </select>
          </div>

          {/* 알람 */}
          <div className="form-group">
            <label className="form-label">알람설정</label>
            <div className="toggle-container">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={!!formData.alarmTime}
                  onChange={handleToggleAlarm}
                />
                <span className="toggle-slider"></span>
              </label>
              <span className="toggle-label">
                {formData.alarmTime ? "켜짐" : "꺼짐"}
              </span>
            </div>

            {formData.alarmTime && (
              <input
                type="time"
                name="alarmTime"
                value={formData.alarmTime}
                onChange={handleChange}
                className="form-input"
                style={{ marginTop: "12px" }}
              />
            )}
          </div>

          {/* 버튼 */}
          <div className="modal-button-group">
            <button
              type="button"
              className="modal-cancel-btn"
              onClick={handleCancel}
            >
              취소
            </button>
            <button type="submit" className="modal-submit-btn">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoModal;
