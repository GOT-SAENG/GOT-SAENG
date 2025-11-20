import { useQuery } from "@tanstack/react-query"

const fetchHistory = async () => {
    const response = await fetch('http://localhost:3001/history');
    if (!response.ok) {
        throw new Error("Todo Data를 불러오는데 실패했습니다.")
    }
    return response.json();
}

export const useHistory = () => {
    return useQuery({
        queryKey: ['history'],
        queryFn: fetchHistory
    })
}