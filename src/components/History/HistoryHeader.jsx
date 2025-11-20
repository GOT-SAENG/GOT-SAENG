import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./HistoryHeader.css";

const HistoryHeader = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // 로그아웃 로직 추가
    console.log("로그아웃");
  };

  return (
    <div className="history-header">
      <Container>
        <Row className="align-items-center justify-content-between">
          {/* 좌측: 타이틀 */}
          <Col xs="auto">
            <h2 className="header-title">GOTSAENG</h2>
          </Col>

          {/* 우측: 사용자 프로필 드롭다운 */}
          <Col xs="auto">
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                id="user-dropdown"
                className="user-profile-dropdown"
              >
                <div className="user-profile">
                  <span className="user-name">기문님</span>
                  <div className="user-avatar"></div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleNavigation("/mypage")}>
                  마이페이지
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleNavigation("/todo")}>
                  투두리스트
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleNavigation("/scheduler")}>
                  스케줄러
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HistoryHeader;
