import TodoItem from "./TodoItem";
import "./TodoList.style.css";

function TodoList({ todos = [] }) {
  const hasData = todos.length > 0;

  return (
    <div className="todo-list-container">
      {hasData ? (
        todos.map((item) => <TodoItem key={item.id} item={item} />)
      ) : (
        <div className="empty-message">할 일이 등록되지 않았습니다.</div>
      )}
    </div>
  );
}

export default TodoList;

