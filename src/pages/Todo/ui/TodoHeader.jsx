import Button from "react-bootstrap/Button";
import "./TodoHeader.style.css";

function TodoHeader({ onAddTodo }) {
  return (
    <div className="todo-header">
      <div className="month-nav">
        <Button className="round-btn" variant="outline-success">
          {"<"}
        </Button>
        <span className="month-text">2025년 11월</span>
        <Button className="round-btn" variant="outline-success">
          {">"}
        </Button>
      </div>

      <Button className="add-btn" variant="success" onClick={onAddTodo}>
        TODO 추가등록
      </Button>
    </div>
  );
}

export default TodoHeader;
