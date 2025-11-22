import "./AIPriority.style.css";

function AIPriority({ todos = [] }) {
  // todos를 기반으로 AI 추천 우선순위 생성
  // 날짜가 가까울수록 높은 우선순위로 설정 (간단한 로직)
  const getPriority = (startDate) => {
    const today = new Date();
    const todoDate = new Date(startDate);
    const diffTime = todoDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 2) return "high";
    if (diffDays <= 5) return "medium";
    return "low";
  };

  // 우선순위별로 정렬 (high > medium > low)
  const priorityOrder = { high: 3, medium: 2, low: 1 };

  const priorities = todos
    .map((todo) => ({
      id: todo.id,
      title: todo.title,
      startDate: todo.startDate,
      priority: getPriority(todo.startDate),
    }))
    .sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

  return (
    <div className="ai-priority-container">
      <div className="ai-priority-header">
        <h3 className="ai-priority-title">
          <span className="ai-icon">🌻</span>
          AI 추천 우선순위
          <span className="ai-icon">🌻</span>
        </h3>
      </div>

      <div className="ai-priority-list">
        {priorities.length > 0 ? (
          priorities.map((item, index) => (
            <div key={item.id} className="ai-priority-item">
              <div className="priority-number">{index + 1}</div>
              <div className="priority-task">{item.title}</div>
              <div className={`priority-badge priority-${item.priority}`}>
                {item.priority === "high"
                  ? "높음"
                  : item.priority === "medium"
                  ? "보통"
                  : "낮음"}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-message">추천할 할 일이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default AIPriority;
