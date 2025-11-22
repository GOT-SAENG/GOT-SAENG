import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">페이지를 찾을 수 없습니다</h2>
        <p className="not-found-message">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className="not-found-actions">
          <Button
            variant="primary"
            size="lg"
            onClick={handleGoHome}
            className="not-found-button"
          >
            홈으로 이동
          </Button>
          <Button
            variant="outline-secondary"
            size="lg"
            onClick={handleGoBack}
            className="not-found-button"
          >
            이전 페이지
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
