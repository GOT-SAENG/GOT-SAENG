import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./MonthlyHistoryGrid.css";

const MonthCard = ({ month, items }) => {
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
        <ul className="achievement-list">
          {currentItems.map((item, idx) => (
            <li key={idx} className="achievement-item">
              {item}
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

const MonthlyHistoryGrid = ({ historyData }) => {
  const [year, setYear] = useState(2025);

  // historyData가 없으면 로딩 표시
  if (!historyData) {
    return <div>데이터를 불러오는 중...</div>;
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

          {/* 월별 카드 그리드 */}
          <Row className="month-cards-row">
            {monthlyData.map((data) => (
              <Col key={data.month} md={3} sm={6} xs={12} className="mb-4">
                <MonthCard month={data.month} items={data.items} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default MonthlyHistoryGrid;
