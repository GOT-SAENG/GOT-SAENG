import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = "http://localhost:3001";

// todos 목록 가져오기
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
