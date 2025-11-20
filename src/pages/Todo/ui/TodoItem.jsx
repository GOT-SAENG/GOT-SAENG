import "./TodoItem.style.css";
import Button from "react-bootstrap/Button";

function TodoItem({ item }) {
  return (
    <div className="todo-item">
      {/* 썸네일 어떤걸로 할까요???????????????????????*/}
      {/* <div className="todo-thumb"></div> */}

      {/* 가운데(왼쪽?) 텍스트 */}
      <div className="todo-text">
        <div className="todo-date">{item.startDate}</div>
        <div className="todo-title">{item.title}</div>
      </div>

      {/* 오른쪽 버튼 */}
      <div className="todo-actions">
        <Button className="todo-edit-btn">수정하기</Button>
        <Button className="todo-delete-btn">삭제하기</Button>
      </div>
    </div>
  );
}

export default TodoItem;
