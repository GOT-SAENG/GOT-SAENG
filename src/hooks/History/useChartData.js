import { useQuery } from "@tanstack/react-query"

const fetchChartData = async () => {
    const response = await fetch('http://localhost:3001/chartData')
    if (!response.ok) {
        throw new Error('chart data를 가져오는 실패했습니다.')
    }
    return response.json();
}

export const useChartData = () => {
    return useQuery({
        queryKey: ['chartData'],
        queryFn: fetchChartData
    })
}