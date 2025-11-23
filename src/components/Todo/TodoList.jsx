import TodoItem from "./TodoItem";
import "./TodoList.style.css";

const TodoList = ({ todos = [], onEdit, onDelete, onToggleComplete }) => {
  const hasData = todos.length > 0;

  return (
    <div className="todo-list-container">
      {hasData ? (
        todos.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))
      ) : (
        <div className="empty-message">할 일이 등록되지 않았습니다.</div>
      )}
    </div>
  );
};

export default TodoList;
