import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 서비스 기능 관련 컴포넌트
// 아이콘과 제목, 설명을 한 세트로 보여줌
// icon: FontAwesome 아이콘 객체
// title: 기능 제목
// description: 기능 설명
// delay: 카드가 나타나는 시간 지연 (밀리초)
const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  // 카드가 화면에 보이는지 여부를 관리하는 상태
  const [isVisible, setIsVisible] = useState(false);

  // 컴포넌트가 화면에 나타날 때 실행
  useEffect(() => {
    // delay 시간 후에 카드를 보이게 만듬
    const timer = setTimeout(() => setIsVisible(true), delay);

    // 컴포넌트가 사라질 때 타이머를 정리
    return () => clearTimeout(timer);
  }, [delay]); // delay 값이 변경될 때만 다시 실행

  return (
    // isVisible이 true면 visible 클래스가 추가되어 애니메이션이 실행
    <div className={`feature-card ${isVisible ? "visible" : ""}`}>
      {/* 원형 아이콘 영역 */}
      <div className="icon-circle">
        <FontAwesomeIcon icon={icon} />
      </div>

      {/* 텍스트 내용 영역 */}
      <div className="card-content">
        {/* 기능 제목 */}
        <div className="card-title">{title}</div>
        {/* 기능 설명 */}
        <div className="card-description">{description}</div>
      </div>
    </div>
  );
};

export default FeatureCard;
