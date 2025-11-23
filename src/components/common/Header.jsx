import { Container, Row, Col, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Context 추가
import "./Header.css";
import logo from "../../assets/logo2.svg";

const Header = () => {
  const navigate = useNavigate();
  // 로그인 상태와 사용자 정보 가져오기
  const { user, isAuthenticated, logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  // 로그아웃 기능 구현
  const handleLogout = () => {
    logout(); // Context의 로그아웃 함수 호출
    navigate("/"); // 홈으로 이동
  };

  // 로그인 버튼 클릭
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="header">
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col xs="auto">
            <div
              className="header-title"
              onClick={() => handleNavigation("/todo")}
              style={{ cursor: "pointer" }}
            >
              <img src={logo} alt="GOTSAENG logo" className="logo-image" />
            </div>
          </Col>

          <Col xs="auto">
            {/* 로그인 여부에 따라 다른 UI 표시 */}
            {isAuthenticated() ? (
              // 로그인한 경우: 드롭다운 메뉴
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="user-dropdown"
                  className="user-profile-dropdown"
                >
                  <div className="user-profile">
                    {/* 실제 사용자 닉네임 표시 */}
                    <span className="user-name">{user.nickname}님</span>
                    <div className="user-avatar">
                      {/* 프로필 이미지가 있으면 표시, 없으면 첫 글자 */}
                      {localStorage.getItem(`profile_${user.email}`) ? (
                        <img
                          src={localStorage.getItem(`profile_${user.email}`)}
                          alt="프로필"
                          className="avatar-image"
                        />
                      ) : (
                        <span className="avatar-initial">
                          {user.nickname.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleNavigation("/mypage")}>마이페이지</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleNavigation("/todo")}>투두리스트</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleNavigation("/scheduler")}>스케줄러</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleNavigation("/history")}>히스토리</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="logout-item">
                    로그아웃
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              // 로그인하지 않은 경우: 로그인 버튼
              <button className="login-button" onClick={handleLogin}>
                로그인
              </button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
