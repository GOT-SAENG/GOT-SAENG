import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircle } from "@fortawesome/free-regular-svg-icons";
import LoadingSpinner from "../common/LoadingSpinner";
import EmptyState from "./EmptyState";
import "./MonthlyHistoryGrid.css";

const MonthCard = ({ month, items, onToggleComplete, monthId }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleToggle = (itemId, currentCompleted) => {
    onToggleComplete(monthId, itemId, !currentCompleted);
  };

  return (
    <Card className="month-card">
      <Card.Header className="month-card-header">
        <span className="month-label">{month}월</span>
        <div className="pagination-buttons">
          {currentPage > 0 && (
            <Button
              variant="link"
              className="detail-button"
              onClick={handlePrevPage}
            >
              &lt;
            </Button>
          )}
          {currentPage < totalPages - 1 && (
            <Button
              variant="link"
              className="detail-button"
              onClick={handleNextPage}
            >
              &gt;
            </Button>
          )}
        </div>
      </Card.Header>
      <Card.Body className="month-card-body">
        {items.length === 0 ? (
          <div className="empty-month">
            <p className="empty-month-text">기록이 없습니다</p>
          </div>
        ) : (
          <ul className="achievement-list">
            {currentItems.map((item) => (
              <li key={item.id} className="achievement-item">
                <div
                  className={`achievement-item-wrapper ${
                    item.completed ? "completed" : "incomplete"
                  }`}
                  onClick={() => handleToggle(item.id, item.completed)}
                >
                  <FontAwesomeIcon
                    icon={item.completed ? faCircleCheck : faCircle}
                    className="achievement-icon"
                  />
                  <span className="achievement-text">{item.text}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};

const MonthlyHistoryGrid = ({ historyData, onToggleComplete }) => {
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
                    monthId={data.id}
                    onToggleComplete={onToggleComplete}
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
