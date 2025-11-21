import React, { useState, useEffect } from "react";
// 개별 문제 카드 컴포넌트
// props로 받은 텍스트를 카드 형태로 보여줌
// text: 카드에 표시할 문제 텍스트
// delay: 카드가 나타나는 시간 지연 (밀리초)
const ProblemCard = ({ text, delay = 0 }) => {
  // 카드가 화면에 보이는지 여부를 관리하는 상태
  const [isVisible, setIsVisible] = useState(false);

  // 컴포넌트가 화면에 나타날 때 실행
  useEffect(() => {
    // delay 시간 후에 카드를 보여줌
    const timer = setTimeout(() => setIsVisible(true), delay);

    // 컴포넌트가 사라질 때 타이머를 정리
    return () => clearTimeout(timer);
  }, [delay]); // delay 값이 변경될 때만 다시 실행

  return (
    // isVisible이 true면 visible 클래스가 추가되어 애니메이션이 실행
    <div className={`problem-card ${isVisible ? "visible" : ""}`}>{text}</div>
  );
};

export default ProblemCard;
