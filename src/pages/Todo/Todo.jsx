import { useState } from "react";
import TodoHeader from "./ui/TodoHeader";
import TodoList from "./ui/TodoList";
import AIPriority from "./ui/AIPriority";
import TodoModal from "./components/TodoModal";
import "./Todo.style.css";

function Todo() {
  const [showAIPriority, setShowAIPriority] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos] = useState([
    {
      id: 1,
      title: "React 공부",
      startDate: "2025-11-13",
    },
    {
      id: 2,
      title: "디자인 리뷰",
      startDate: "2025-11-15",
    },
    {
      id: 3,
      title: "프로젝트 회의",
      startDate: "2025-11-16",
    },
    {
      id: 4,
      title: "코드 리뷰 작성",
      startDate: "2025-11-17",
    },
    {
      id: 5,
      title: "문서 정리",
      startDate: "2025-11-18",
    },
  ]);

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
    <div className="todo-page">
      <div className="todo-content">
        <TodoHeader onAddTodo={handleAddTodo} />
        <TodoList todos={todos} />
        {showAIPriority && <AIPriority todos={todos} />}
      </div>

      {/* AI추천받기버튼 */}
      <button className="ai-recommend-button" onClick={handleAIRecommend}>
        <span>✨</span>
        AI 추천 받기
      </button>

      {/* Todo 모달 */}
      <TodoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTodo}
      />
    </div>
  );
}

export default Todo;
