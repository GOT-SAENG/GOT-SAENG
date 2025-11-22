import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import LoadingSpinner from "../common/LoadingSpinner";
import EmptyState from "./EmptyState";
import MonthCard from "./MonthCard";
import "./MonthlyHistoryGrid.css";

const MonthlyHistoryGrid = ({ historyData }) => {
  const [year, setYear] = useState(2025);

  // historyData가 없으면 로딩 표시
  if (!historyData) {
    return <LoadingSpinner size="medium" message="기록을 불러오는 중..." />;
  }

  // 전체 히스토리 데이터가 없을 때
  if (!historyData || historyData.length === 0) {
    return (
      <div className="monthly-history-grid">
        <Container>
          <div className="grid-box">
            <h2 className="grid-title">전체 히스토리</h2>
            <EmptyState
              type="history"
              title="아직 히스토리가 없어요"
              message="완료한 할 일들이 여기에 기록됩니다"
            />
          </div>
        </Container>
      </div>
    );
  }

  // 선택된 year에 맞는 데이터만 필터링
  const monthlyData = historyData
    .filter((item) => item.year === year)
    .sort((a, b) => a.month - b.month);

  const handlePrevYear = () => setYear(year - 1);
  const handleNextYear = () => setYear(year + 1);

  return (
    <div className="monthly-history-grid">
      <Container>
        <div className="grid-box">
          {/* 제목 */}
          <h2 className="grid-title">전체 히스토리</h2>

          {/* 연도 네비게이터 */}
          <div className="year-navigator">
            <Button variant="outline-secondary" onClick={handlePrevYear}>
              &lt;
            </Button>
            <h3 className="year-title">{year}</h3>
            <Button variant="outline-secondary" onClick={handleNextYear}>
              &gt;
            </Button>
          </div>

          {/* 월별 카드 그리드 또는 Empty State */}
          {monthlyData.length === 0 ? (
            <EmptyState
              type="year"
              title={`${year}년 기록이 없어요`}
              message="다른 연도를 선택하거나 새로운 기록을 추가해보세요"
            />
          ) : (
            <Row className="month-cards-row">
              {monthlyData.map((data) => (
                <Col key={data.month} md={3} sm={6} xs={12} className="mb-4">
                  <MonthCard
                    month={data.month}
                    items={data.items}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>
    </div>
  );
};

export default MonthlyHistoryGrid;
