import { useQuery } from "@tanstack/react-query";

const calculateCompletionRate = (items) => {
  if (!items || items.length === 0) {
    return 0;
  }
  const completedItems = items.filter((item) => item.completed);
  return Math.round((completedItems.length / items.length) * 100);
};


const getMonthlyData = (history) => {
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  const sortedHistory = history.sort((a, b) => (a.year === b.year ? b.month - a.month : b.year - a.year));
  const recentHistory = sortedHistory.slice(0, 6).reverse();

  return recentHistory.map((monthData) => ({
    name: monthNames[monthData.month - 1],
    value: calculateCompletionRate(monthData.items),
  }));
};

const getYearlyData = (history) => {
  const yearlyData = {};
  history.forEach((monthData) => {
    if (!yearlyData[monthData.year]) {
      yearlyData[monthData.year] = [];
    }
    yearlyData[monthData.year].push(...monthData.items);
  });

  return Object.keys(yearlyData).map((year) => ({
    name: year,
    value: calculateCompletionRate(yearlyData[year]),
  }));
};


const getDailyData = () => [
  { name: "월", value: 80 },
  { name: "화", value: 65 },
  { name: "수", value: 90 },
  { name: "목", value: 75 },
  { name: "금", value: 85 },
  { name: "토", value: 70 },
  { name: "일", value: 95 },
];

const getWeeklyData = () => [
  { name: "1주", value: 75 },
  { name: "2주", value: 82 },
  { name: "3주", value: 68 },
  { name: "4주", value: 90 },
];


const fetchChartData = async () => {
  const response = await fetch("http://localhost:3001/history");
  if (!response.ok) {
    throw new Error("history data를 가져오는데 실패했습니다.");
  }
  const history = await response.json();

  const monthly = getMonthlyData(history);
  const yearly = getYearlyData(history);
  const daily = getDailyData();
  const weekly = getWeeklyData();

  return [
    { id: "1", period: "daily", data: daily },
    { id: "2", period: "weekly", data: weekly },
    { id: "3", period: "monthly", data: monthly },
    { id: "4", period: "yearly", data: yearly },
  ];
};

export const useChartData = () => {
  return useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });
};