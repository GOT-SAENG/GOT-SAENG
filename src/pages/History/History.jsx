import React, { useMemo } from "react";
import { useHistory } from "../../hooks/History/useHistory";
import Header from "../../components/common/Header";
import AchievementChart from "../../components/History/AchievementChart";
import MonthlyHistoryGrid from "../../components/History/MonthlyHistoryGrid";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import "./History.css";

// 에러 메시지 헬퍼 함수
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

const History = () => {
  const {
    data: historyData,
    isLoading: historyLoading,
    error: historyError,
    refetch: refetchHistory,
  } = useHistory();

  // 실제 달성률 계산
  const chartData = useMemo(() => {
    if (!historyData || historyData.length === 0) return null;

    // 월간 달성률 계산
    const monthlyData = historyData.map((monthItem) => {
      const totalItems = monthItem.items.length;
      const completedItems = monthItem.items.filter(
        (item) => item.completed
      ).length;
      const percentage =
        totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

      return {
        name: `${monthItem.month}월`,
        value: percentage,
      };
    });

    // 연간 달성률 계산 (연도별로 그룹화)
    const yearlyStats = {};
    historyData.forEach((monthItem) => {
      if (!yearlyStats[monthItem.year]) {
        yearlyStats[monthItem.year] = { total: 0, completed: 0 };
      }
      yearlyStats[monthItem.year].total += monthItem.items.length;
      yearlyStats[monthItem.year].completed += monthItem.items.filter(
        (item) => item.completed
      ).length;
    });

    const yearlyData = Object.entries(yearlyStats).map(([year, stats]) => ({
      name: `${year}`,
      value:
        stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0,
    }));

    return [
      { id: "1", period: "daily", data: [] },
      { id: "2", period: "weekly", data: [] },
      { id: "3", period: "monthly", data: monthlyData },
      { id: "4", period: "yearly", data: yearlyData },
    ];
  }, [historyData]);

  if (historyLoading) {
    return (
      <div className="history-page">
        <Header />
        <LoadingSpinner size="large" message="데이터를 불러오는 중..." />
      </div>
    );
  }

  if (historyError) {
    return (
      <div className="history-page">
        <Header />
        <ErrorMessage
          title="히스토리를 불러올 수 없습니다"
          message={getErrorMessage(historyError)}
          onRetry={refetchHistory}
          showHomeButton={true}
        />
      </div>
    );
  }

  return (
    <div className="history-page">
      <Header />
      <AchievementChart chartData={chartData} />
      <MonthlyHistoryGrid historyData={historyData} />
    </div>
  );
};

export default History;
