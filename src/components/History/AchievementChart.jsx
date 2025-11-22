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
import LoadingSpinner from "../common/LoadingSpinner";
import "./AchievementChart.css";

const AchievementChart = ({ chartData }) => {
  const [period, setPeriod] = useState("daily");

  if (!chartData) {
    return <LoadingSpinner size="medium" message="차트를 불러오는 중..." />;
  }

  const getData = () => {
    const periodData = chartData.find((item) => item.period === period);
    return periodData ? periodData.data : [];
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
