import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircle } from "@fortawesome/free-regular-svg-icons";
import "./MonthCard.css";

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

export default MonthCard;
