import { useState } from "react";
import TodoHeader from "../../components/Todo/TodoHeader";
import TodoList from "../../components/Todo/TodoList";
import AIPriority from "../../components/Todo/AIPriority";
import TodoModal from "../../components/Todo/TodoModal";
import "./Todo.style.css";
import HistoryHeader from "../../components/History/HistoryHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import {
  useTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../../hooks/useTodos";
import { useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-bootstrap";

const Todo = () => {
  const [showAIPriority, setShowAIPriority] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  // const [todos] = useState();
  const { data: todos, isLoading, isError, error } = useTodosQuery();
  const addTodoMutation = useAddTodoMutation(); // 등록하기(POSY)
  const updateTodoMutation = useUpdateTodoMutation(); // 수정하기(PUT)
  const deleteTodoMutation = useDeleteTodoMutation(); // 삭제하기 (DELETE)
  const queryClient = useQueryClient(); // 자동목록갱신

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

  // Todo 수정하기(모달열기)_기능추가해야함
  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setIsModalOpen(true);
  };

  // Todo 삭제하기
  const handleDeleteTodo = async (todo) => {
    console.log("삭제요청 ID:", todo.id);
    const confirmed = window.confirm(
      `"${todo.title}" 할 일을 삭제하시겠습니까?`
    );

    if (confirmed) {
      try {
        await deleteTodoMutation.mutateAsync(todo.id);

        // 목록 자동 새로고침
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      } catch (err) {
        console.error(err);
        alert("삭제 실패했습니다.");
      }
    }
  };

  // Todo 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditTodo(null);
  };

  // Todo 저장하기 (등록 또는 수정)
  const handleSaveTodo = async (todoData) => {
    const now = new Date().toISOString();

    if (editTodo) {
      // 수정 모드
      const updatedTodo = {
        ...editTodo, // 기존 데이터 유지 (id, createdAt 등)
        title: todoData.title,
        description: todoData.description || "",
        importance: parseInt(todoData.priority),
        dateType: todoData.dateType,
        startDate: todoData.startDate,
        dueDate: todoData.dateType === "single" ? null : todoData.dueDate,
        category: editTodo.category || "기타", // 기존 카테고리 유지
        isAlarm: todoData.isAlarm || false,
        updatedAt: now, // 수정 시간 업데이트
        startTime: todoData.startTime || null,
        endTime: todoData.endTime || null,
        status: editTodo.status || "pending", // 기존 상태 유지
      };

      try {
        await updateTodoMutation.mutateAsync(updatedTodo);

        // 목록 자동 새로고침
        queryClient.invalidateQueries({ queryKey: ["todos"] });

        handleCloseModal();
      } catch (err) {
        console.error(err);
        alert("수정 실패했습니다.");
      }
    } else {
      // 등록 모드
      const newTodo = {
        title: todoData.title,
        description: todoData.description || "",
        importance: parseInt(todoData.priority),
        dateType: todoData.dateType,
        startDate: todoData.startDate,
        dueDate: todoData.dateType === "single" ? null : todoData.dueDate,
        category: "기타",
        isAlarm: todoData.isAlarm || false,
        createdAt: now,
        updatedAt: now,
        startTime: todoData.startTime || null,
        endTime: todoData.endTime || null,
        status: "pending",
      };

      try {
        await addTodoMutation.mutateAsync(newTodo);

        // 목록 자동 새로고침
        queryClient.invalidateQueries({ queryKey: ["todos"] });

        handleCloseModal();
      } catch (err) {
        console.error(err);
        alert("등록 실패했습니다.");
      }
    }
  };

  return (
    <div className="todo-container">
      <HistoryHeader />
      <div className="todo-page">
        <div className="todo-content">
          <TodoHeader onAddTodo={handleAddTodo} />
          {/* 서버에서 todos 받아오기 */}
          <TodoList
            todos={todos}
            onEdit={handleEditTodo} // 수정하기
            onDelete={handleDeleteTodo} // 삭제하기
          />
          {showAIPriority && <AIPriority todos={todos} />}
        </div>

        {/* AI추천받기버튼 */}
        <button className="ai-recommend-button" onClick={handleAIRecommend}>
          <FontAwesomeIcon icon={faWandMagicSparkles} />
          AI 추천 받기
        </button>

        {/* Todo 모달 */}
        <TodoModal
          key={editTodo?.id || "new"} // editTodo가 변경되면 컴포넌트 리마운트
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveTodo}
          editTodo={editTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
