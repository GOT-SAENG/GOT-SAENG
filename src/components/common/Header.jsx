import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // 로그아웃 로직 추가
    console.log("로그아웃");
  };

  return (
    <div className="header">
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col xs="auto">
            <h2
              className="header-title"
              onClick={() => handleNavigation("/todo")}
            >
              GOTSAENG
            </h2>
          </Col>

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

export default Header;
