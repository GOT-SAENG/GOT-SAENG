import React from "react";

// 페이지 이동을 위한 useNavigate 훅을 불러오기
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Call To Action
// 사용자에게 행동을 유도하는 섹션 컴포넌트
// 여기서는 무료로 시작하기 버튼을 통해 로그인 페이지로 이동
const CTASection = () => {
  // 페이지 이동을 위한 navigate 함수를 가져오기
  const navigate = useNavigate();

  // 로그인 상태를 확인하는 함수
  const { isAuthenticated } = useAuth();

  // 시작하기 버튼을 클릭했을 때 실행되는 함수
  const handleStartClick = () => {
    // 로그인이 되어 있으면 /todo로 이동
    // 로그인이 안되어 있으면 '/login' 경로로 이동
    if (!isAuthenticated) {
      navigate("/todo");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="home-footer">
      {/* 섹션 제목 */}
      <div className="section-title">더 이상 "뭐부터 하지?" 고민하지 마세요</div>

      {/* 부제목 */}
      <div className="sub-text">
        <p>결정은 AI에게, 실행은 나에게</p>
      </div>

      {/* 버튼을 가운데 정렬하는 컨테이너 */}
      <div className="btn-container">
        {/* 클릭하면 handleStartClick 함수가 실행 */}
        <button className="start-btn" onClick={handleStartClick}>
          무료로 시작하기 →
        </button>
      </div>
    </section>
  );
};

export default CTASection;
