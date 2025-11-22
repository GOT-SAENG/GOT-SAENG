import "./TodoItem.style.css";
import Button from "react-bootstrap/Button";

const TodoItem = ({ item, onEdit, onDelete, onView }) => {
  // 상세내용 미리보기 (최대 50자)
  const getDescriptionPreview = (description) => {
    if (!description) return null;
    const maxLength = 50;
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  const handleItemClick = (e) => {
    // 버튼 클릭 시에는 상세보기 모달이 열리지 않도록
    if (e.target.closest(".todo-actions")) {
      return;
    }
    onView(item);
  };

  return (
    <div className="todo-item" onClick={handleItemClick}>
      {/* 썸네일 어떤걸로 할까요???????????????????????*/}
      {/* <div className="todo-thumb"></div> */}

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
