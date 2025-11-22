import { useState, useMemo } from "react";
import TodoHeader from "../../components/Todo/TodoHeader";
import TodoList from "../../components/Todo/TodoList";
import AIPriority from "../../components/Todo/AIPriority";
import TodoModal from "../../components/Todo/TodoModal";
import Modal from "../../components/common/Modal";
import "./Todo.style.css";
import Header from "../../components/common/Header";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import {
  useTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../../hooks/useTodos";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

const getErrorMessage = (error) => {
  if (!error) return "알 수 없는 오류가 발생했습니다.";

  const message = error.message || "";

  if (message.includes("fetch") || message.includes("Failed to fetch")) {
    return "인터넷 연결을 확인해주세요.";
  }
  if (message.includes("timeout")) {
    return "요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.";
  }
  if (message.includes("Network")) {
    return "네트워크 연결이 불안정합니다.";
  }

  return "서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.";
};

// 투두를 월별로 필터링하는 함수
const getTodosByMonth = (todos, year, month) => {
  return todos.filter((todo) => {
    if (!todo.startDate) return false;

    const startDate = new Date(todo.startDate);
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();

    if (todo.dateType === "range" && todo.dueDate) {
      const dueDate = new Date(todo.dueDate);
      const dueYear = dueDate.getFullYear();
      const dueMonth = dueDate.getMonth();

      const isStartInMonth = startYear === year && startMonth === month;
      const isDueInMonth = dueYear === year && dueMonth === month;

      const targetDate = new Date(year, month, 1);
      const isMonthInRange = startDate <= targetDate && targetDate <= dueDate;

      return isStartInMonth || isDueInMonth || isMonthInRange;
    } else {
      return startYear === year && startMonth === month;
    }
  });
};

const Todo = () => {
  const [showAIPriority, setShowAIPriority] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [date, setDate] = useState(new Date());
  // const [todos] = useState();
  const {
    data: todos,
    isLoading,
    isError,
    error,
    refetch: refetchTodos,
  } = useTodosQuery();
  const addTodoMutation = useAddTodoMutation(); // 등록하기(POSY)
  const updateTodoMutation = useUpdateTodoMutation(); // 수정하기(PUT)
  const deleteTodoMutation = useDeleteTodoMutation(); // 삭제하기 (DELETE)
  const queryClient = useQueryClient(); // 자동목록갱신

  // 월별 이동 함수들
  const year = date.getFullYear();
  const month = date.getMonth();

  const minusMonth = () =>
    setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  const plusMonth = () =>
    setDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  const goToToday = () => setDate(new Date());

  // 선택한 월의 투두만 필터링
  const filteredTodos = useMemo(() => {
    if (!todos || todos.length === 0) return [];
    return getTodosByMonth(todos, year, month);
  }, [todos, year, month]);

  console.log("데이터:", todos, isLoading, isError);
  if (isLoading) {
    return (
      <div className="todo-container">
        <Header />
        <LoadingSpinner size="large" message="Todo 불러오는 중..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="todo-container">
        <Header />
        <ErrorMessage
          title="Todo를 불러올 수 없습니다"
          message={getErrorMessage(error)}
          onRetry={refetchTodos}
          showHomeButton={true}
        />
      </div>
    );
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

  // Todo 삭제하기 (모달 열기)
  const handleDeleteTodo = (todo) => {
    setTodoToDelete(todo);
    setIsDeleteModalOpen(true);
  };

  // Todo 삭제 확인
  const handleConfirmDelete = async () => {
    if (!todoToDelete) return;

    try {
      await deleteTodoMutation.mutateAsync(todoToDelete.id);

      // 목록 자동 새로고침
      queryClient.invalidateQueries({ queryKey: ["todos"] });

      setIsDeleteModalOpen(false);
      setTodoToDelete(null);
    } catch (err) {
      console.error(err);
      alert("삭제 실패했습니다.");
      setIsDeleteModalOpen(false);
      setTodoToDelete(null);
    }
  };

  // 삭제 모달 닫기
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTodoToDelete(null);
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
      <Header />
      <div className="todo-page">
        <div className="todo-content">
          <TodoHeader
            onAddTodo={handleAddTodo}
            year={year}
            month={month}
            onMinusMonth={minusMonth}
            onPlusMonth={plusMonth}
            onGoToToday={goToToday}
          />
          {/* 서버에서 todos 받아오기 */}
          <TodoList
            todos={filteredTodos}
            onEdit={handleEditTodo} // 수정하기
            onDelete={handleDeleteTodo} // 삭제하기
          />
          {showAIPriority && <AIPriority todos={filteredTodos || []} />}
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

        {/* 삭제 확인 모달 */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="TODO 삭제"
          message={
            todoToDelete
              ? `"${todoToDelete.title}" Todo 삭제하시겠습니까?`
              : "정말 삭제하시겠습니까?"
          }
          confirmText="삭제"
          confirmButtonStyle="danger"
        />
      </div>
    </div>
  );
};

export default Todo;
