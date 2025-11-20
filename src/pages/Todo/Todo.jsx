import { useState } from "react";
import TodoHeader from "./ui/TodoHeader";
import TodoList from "./ui/TodoList";
import AIPriority from "./ui/AIPriority";
import "./Todo.style.css";

function Todo() {
  const [showAIPriority, setShowAIPriority] = useState(false);
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

  const handleAIRecommend = () => {
    setShowAIPriority(!showAIPriority);
  };

  return (
    <div className="todo-page">
      <div className="todo-content">
        <TodoHeader />
        <TodoList todos={todos} />
        {showAIPriority && <AIPriority todos={todos} />}
      </div>

      {/* AI추천받기버튼 */}
      <button className="ai-recommend-button" onClick={handleAIRecommend}>
        <span>✨</span>
        AI 추천 받기
      </button>
    </div>
  );
}

export default Todo;
