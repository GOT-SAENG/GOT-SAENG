import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const fetchHistory = async () => {
    const response = await fetch('http://localhost:3001/history');
    if (!response.ok) {
        throw new Error("History Data를 불러오는데 실패했습니다.")
    }
    return response.json();
}

const updateHistoryItem = async ({ monthId, itemId, completed }) => {
    // 먼저 해당 월의 데이터를 가져옴
    const response = await fetch(`http://localhost:3001/history/${monthId}`);
    if (!response.ok) {
        throw new Error("History Data를 불러오는데 실패했습니다.");
    }
    const monthData = await response.json();

    // items 배열에서 해당 항목을 찾아서 completed 상태 업데이트
    const updatedItems = monthData.items.map(item =>
        item.id === itemId ? { ...item, completed } : item
    );

    // 서버에 업데이트된 데이터 전송
    const updateResponse = await fetch(`http://localhost:3001/history/${monthId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...monthData,
            items: updatedItems
        })
    });

    if (!updateResponse.ok) {
        throw new Error("History 업데이트에 실패했습니다.");
    }

    return updateResponse.json();
}

export const useHistory = () => {
    return useQuery({
        queryKey: ['history'],
        queryFn: fetchHistory
    })
}

export const useUpdateHistoryItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateHistoryItem,
        onSuccess: () => {
            // 성공 시 history 데이터 다시 가져오기
            queryClient.invalidateQueries({ queryKey: ['history'] });
        },
    });
}