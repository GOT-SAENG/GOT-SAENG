import { useState } from "react";
import TodoHeader from "../../components/Todo/TodoHeader";
import TodoList from "../../components/Todo/TodoList";
import AIPriority from "../../components/Todo/AIPriority";
import TodoModal from "../../components/Todo/TodoModal";
import "./Todo.style.css";
import HistoryHeader from "../../components/History/HistoryHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { useTodosQuery } from "../../hooks/useTodos";
import { Alert } from "react-bootstrap";

const Todo = () => {
  const [showAIPriority, setShowAIPriority] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [todos] = useState();
  const { data: todos, isLoading, isError, error } = useTodosQuery();
  console.log("데이터:", todos, isLoading, isError);
  if (isLoading) return <div>로딩중...</div>;
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  // 우선순위 보여주기
  const handleAIRecommend = () => {
    setShowAIPriority(!showAIPriority);
  };

  // ToDo 등록하기(모달열기)
  const handleAddTodo = () => {
    setIsModalOpen(true);
  };

  //  Todo 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Todo 등록(저장)하기
  const handleSaveTodo = (todoData) => {
    // TODO: 실제 저장 로직 구현
    console.log("Todo 저장:", todoData);
    handleCloseModal();
  };

  return (
    <div className="todo-container">
      <HistoryHeader />
      <div className="todo-page">
        <div className="todo-content">
          <TodoHeader onAddTodo={handleAddTodo} />
          {/* 서버에서 todos 받아오기 */}
          <TodoList todos={todos} />
          {showAIPriority && <AIPriority todos={todos} />}
        </div>

        {/* AI추천받기버튼 */}
        <button className="ai-recommend-button" onClick={handleAIRecommend}>
          <FontAwesomeIcon icon={faWandMagicSparkles} />
          AI 추천 받기
        </button>

        {/* Todo 모달 */}
        <TodoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
