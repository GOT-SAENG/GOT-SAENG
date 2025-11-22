import React from "react";

// 홈페이지 맨 위의 히어로 섹션 컴포넌트
// 메인 타이틀과 간단한 설명을 보여줌
const HeroSection = () => {
  return (
    <section className="home-header">
      {/* 상단에 떠다니는 배지 */}
      <div className="badge">✨ AI 기반 스마트 플래너</div>

      {/* 메인 제목 영역 */}
      <div className="main-area">
        <div>계획을 못짜서</div>
        {/* gradient-text 클래스로 그라데이션 효과 */}
        <div className="gradient-text">아무것도 못하는 당신에게</div>
      </div>

      {/* 부제목 - 서비스 설명 */}
      <div className="sub-text">
        <p>AI가 오늘 할 일의 우선순위를 정해주고</p>
        <p>타임 블록까지 자동으로 만들어 드려요</p>
      </div>
    </section>
  );
};

export default HeroSection;
