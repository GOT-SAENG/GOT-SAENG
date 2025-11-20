import Button from "react-bootstrap/Button";
import "./TodoHeader.style.css";

function TodoHeader() {
  return (
    <div className="todo-header">
      {/* 월 이동 UI */}
      <div className="month-nav">
        <Button className="round-btn" variant="outline-success">
          {"<"}
        </Button>

        <span className="month-text">2025년 11월</span>

        <Button className="round-btn" variant="outline-success">
          {">"}
        </Button>
      </div>

      {/* 할 일 추가 버튼 */}
      <Button className="add-btn" variant="success">
        TODO 추가등록
      </Button>
    </div>
  );
}

export default TodoHeader;

