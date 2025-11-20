import React from "react";
import HistoryHeader from "../../components/History/HistoryHeader";
import AchievementChart from "../../components/History/AchievementChart";
import MonthlyHistoryGrid from "../../components/History/MonthlyHistoryGrid";
import "./History.css";

const History = () => {
  return (
    <div className="history-page">
      <HistoryHeader />
      <AchievementChart />
      <MonthlyHistoryGrid />
    </div>
  );
};

export default History;
