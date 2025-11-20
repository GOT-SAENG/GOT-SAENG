import { useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./AchievementChart.css";

const AchievementChart = () => {
  const [period, setPeriod] = useState("daily");

  // 샘플 데이터
  const dailyData = [
    { name: "월", value: 80 },
    { name: "화", value: 65 },
    { name: "수", value: 90 },
    { name: "목", value: 75 },
    { name: "금", value: 85 },
    { name: "토", value: 70 },
    { name: "일", value: 95 },
  ];

  const weeklyData = [
    { name: "1주", value: 75 },
    { name: "2주", value: 82 },
    { name: "3주", value: 68 },
    { name: "4주", value: 90 },
  ];

  const monthlyData = [
    { name: "1월", value: 70 },
    { name: "2월", value: 80 },
    { name: "3월", value: 85 },
    { name: "4월", value: 75 },
    { name: "5월", value: 90 },
    { name: "6월", value: 88 },
  ];

  const yearlyData = [
    { name: "2022", value: 70 },
    { name: "2023", value: 78 },
    { name: "2024", value: 85 },
    { name: "2025", value: 92 },
  ];

  const getData = () => {
    switch (period) {
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      case "yearly":
        return yearlyData;
      default:
        return dailyData;
    }
  };

  return (
    <div className="achievement-chart">
      <Container>
        <div className="chart-box">
          <div className="chart-header">
            <h3 className="chart-title">달성 차트</h3>
            <div className="chart-comment">
              💬 내가 얼마나 목표대로 열심히 했게?
            </div>
          </div>

          <Tabs
            activeKey={period}
            onSelect={(k) => setPeriod(k)}
            className="period-tabs"
          >
            <Tab eventKey="daily" title="일간" tabClassName="custom-tab" />
            <Tab eventKey="weekly" title="주간" tabClassName="custom-tab" />
            <Tab eventKey="monthly" title="월간" tabClassName="custom-tab" />
            <Tab eventKey="yearly" title="연간" tabClassName="custom-tab" />
          </Tabs>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={getData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                <XAxis dataKey="name" stroke="#6c757d" />
                <YAxis stroke="#6c757d" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #dee2e6",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#b8b8f7"
                  radius={[8, 8, 0, 0]}
                  barSize={100}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AchievementChart;
