import Button from "react-bootstrap/Button";
import "./TodoHeader.style.css";

const TodoHeader = ({
  onAddTodo,
  year,
  month,
  onMinusMonth,
  onPlusMonth,
  onGoToToday,
}) => {
  const monthText = `${year}년 ${month + 1}월`;

  return (
    <div className="todo-header">
      <div className="month-nav">
        <Button
          className="round-btn"
          variant="outline-success"
          onClick={onMinusMonth}
        >
          {"<"}
        </Button>
        <span className="month-text">{monthText}</span>
        <Button
          className="round-btn"
          variant="outline-success"
          onClick={onPlusMonth}
        >
          {">"}
        </Button>
        <Button
          className="today-btn"
          variant="outline-secondary"
          onClick={onGoToToday}
          style={{ marginLeft: "10px", fontSize: "12px" }}
        >
          오늘
        </Button>
      </div>

      <Button className="add-btn" variant="success" onClick={onAddTodo}>
        TODO 추가등록
      </Button>
    </div>
  );
};

export default TodoHeader;
