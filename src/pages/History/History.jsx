import React from "react";
import { useHistory, useUpdateHistoryItem } from "../../hooks/History/useHistory";
import { useChartData } from "../../hooks/History/useChartData";
import Header from "../../components/common/Header";
import AchievementChart from "../../components/History/AchievementChart";
import MonthlyHistoryGrid from "../../components/History/MonthlyHistoryGrid";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import "./History.css";

const History = () => {
  const {
    data: historyData,
    isLoading: historyLoading,
    error: historyError,
  } = useHistory();
  const {
    data: chartData,
    isLoading: chartLoading,
    error: chartError,
  } = useChartData();
  const updateHistoryItem = useUpdateHistoryItem();

  const handleToggleComplete = (monthId, itemId, completed) => {
    updateHistoryItem.mutate({ monthId, itemId, completed });
  };

  if (historyLoading || chartLoading) {
    return (
      <div className="history-page">
        <Header />
        <LoadingSpinner size="large" message="데이터를 불러오는 중..." />
      </div>
    );
  }

  if (historyError) {
    return <div>History 에러: {historyError.message}</div>;
  }

  if (chartError) {
    return <div>ChartData 에러: {chartError.message}</div>;
  }

  return (
    <div className="history-page">
      <Header />
      <AchievementChart chartData={chartData} />
      <MonthlyHistoryGrid
        historyData={historyData}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
};

export default History;
