import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:3001";

// todos 목록 가져오기 (get)
export const useTodosQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      return response.json();
    },
  });
};

// todos 할일 등록하기 (post_Mutation)
//newTodo 이게 params 이군여!

export const useAddTodoMutation = () => {
  return useMutation({
    mutationFn: async (newTodo) => {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      // let result = response.json();

      // console.log(result["id"]);
      return response.json();
      // return result;
    },
  });
};

// todos 수정하기 (PUT)
export const useUpdateTodoMutation = () => {
  return useMutation({
    mutationFn: async (updatedTodo) => {
      const response = await fetch(`${API_BASE_URL}/todos/${updatedTodo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      return response.json(); // 수정된 데이터 반환
    },
  });
};

// todos 삭제하기 (DELETE)
export const useDeleteTodoMutation = () => {
  return useMutation({
    mutationFn: async (todoId) => {
      const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      // return true;
      // return response.json(); // 삭제 성공 시 응답
      return { success: true, id: todoId };
    },
  });
};
