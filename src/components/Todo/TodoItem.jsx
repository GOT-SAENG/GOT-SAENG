import "./TodoItem.style.css";
import Button from "react-bootstrap/Button";

const TodoItem = ({ item, onEdit, onDelete }) => {
  return (
    <div className="todo-item">
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
      </div>

      {/* 오른쪽 버튼 */}
      <div className="todo-actions">
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
