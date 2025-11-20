import React from "react";
import { useHistory } from "../../hooks/History/useHistory";
import { useChartData } from "../../hooks/History/useChartData";
import HistoryHeader from "../../components/History/HistoryHeader";
import AchievementChart from "../../components/History/AchievementChart";
import MonthlyHistoryGrid from "../../components/History/MonthlyHistoryGrid";
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

  if (historyLoading || chartLoading) {
    return <div>로딩 중...</div>;
  }

  if (historyError) {
    return <div>History 에러: {historyError.message}</div>;
  }

  if (chartError) {
    return <div>ChartData 에러: {chartError.message}</div>;
  }
  console.log("History 데이터:", historyData);
  console.log("Chart 데이터:", chartData);
  return (
    <div className="history-page">
      <HistoryHeader />
      <AchievementChart chartData={chartData} />
      <MonthlyHistoryGrid historyData={historyData} />
    </div>
  );
};

export default History;
