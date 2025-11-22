import { useQuery } from "@tanstack/react-query"

const fetchHistory = async () => {
    // todos 데이터를 가져옴
    const response = await fetch('http://localhost:3001/todos');
    if (!response.ok) {
        throw new Error("History Data를 불러오는데 실패했습니다.")
    }
    const todos = await response.json();

    // startDate를 기준으로 연도/월별로 그룹화 (모든 todos 포함)
    const groupedByMonth = todos.reduce((acc, todo) => {
        // startDate가 없으면 스킵
        if (!todo.startDate) return acc;

        const startDate = new Date(todo.startDate);
        const year = startDate.getFullYear();
        const month = startDate.getMonth() + 1; // 0-based이므로 +1

        // 해당 연도/월의 키 생성
        const key = `${year}-${month}`;

        if (!acc[key]) {
            acc[key] = {
                id: key,
                year: year,
                month: month,
                items: []
            };
        }

        // items 배열에 추가
        acc[key].items.push({
            id: todo.id,
            text: todo.title,
            completed: todo.status === 'completed' // status가 completed인 경우 true
        });

        return acc;
    }, {});

    // 객체를 배열로 변환하고 정렬
    const historyArray = Object.values(groupedByMonth)
        .sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.month - b.month;
        });

    return historyArray;
}

export const useHistory = () => {
    return useQuery({
        queryKey: ['history'],
        queryFn: fetchHistory
    })
}