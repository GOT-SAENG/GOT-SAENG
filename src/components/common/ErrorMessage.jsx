import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import "./ErrorMessage.css";

const ErrorMessage = ({
  title = "오류가 발생했습니다",
  message = "알 수 없는 오류가 발생했습니다.",
  onRetry,
  showHomeButton = false,
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="error-message">
      <div className="error-icon">
        <FontAwesomeIcon icon={faExclamationCircle} />
      </div>
      <h3 className="error-title">{title}</h3>
      <p className="error-text">{message}</p>
      <div className="error-actions">
        {onRetry && (
          <Button variant="primary" onClick={onRetry} className="error-button">
            🔄 다시 시도
          </Button>
        )}
        {showHomeButton && (
          <Button
            variant="outline-secondary"
            onClick={handleGoHome}
            className="error-button"
          >
            🏠 홈으로
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
