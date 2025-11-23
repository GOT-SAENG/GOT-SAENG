import "./TodoItem.style.css";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const TodoItem = ({ item, onEdit, onDelete, onView, onToggleComplete }) => {
  const isCompleted = item.status === "completed";

  // 상세내용 미리보기 (최대 50자)
  const getDescriptionPreview = (description) => {
    if (!description) return null;
    const maxLength = 50;
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  const handleItemClick = (e) => {
    if (
      e.target.closest(".todo-actions") ||
      e.target.closest(".todo-checkbox")
    ) {
      return;
    }
    if (onView) {
      onView(item);
    }
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    if (onToggleComplete) {
      onToggleComplete(item);
    }
  };

  return (
    <div
      className={`todo-item ${isCompleted ? "todo-item-completed" : ""}`}
      onClick={handleItemClick}
    >
      {/* 체크박스 */}
      <div className="todo-checkbox" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleCheckboxChange}
          className="todo-checkbox-input"
          aria-label={isCompleted ? "완료 취소" : "완료하기"}
        />
        {isCompleted && (
          <FontAwesomeIcon icon={faCheck} className="todo-checkbox-icon" />
        )}
      </div>

      {/* 가운데(왼쪽?) 텍스트 */}
      <div className="todo-text">
        <div className="todo-date">
          {item.dateType === "range" && item.dueDate
            ? `${item.startDate} ~ ${item.dueDate}`
            : item.startDate}
        </div>
        <div className="todo-title">{item.title}</div>
        {item.description && (
          <div className="todo-description">
            {getDescriptionPreview(item.description)}
          </div>
        )}
      </div>

      {/* 오른쪽 버튼 */}
      <div className="todo-actions" onClick={(e) => e.stopPropagation()}>
        <Button className="todo-edit-btn" onClick={() => onEdit(item)}>
          수정하기
        </Button>
        <Button className="todo-delete-btn" onClick={() => onDelete(item)}>
          삭제하기
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
