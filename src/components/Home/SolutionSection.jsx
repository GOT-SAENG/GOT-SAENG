import React from "react";
import FeatureCard from "./FeatureCard";
import { faAlarmClock, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faBrain } from "@fortawesome/free-solid-svg-icons";

// AI가 제공하는 해결책을 보여주는 섹션 컴포넌트
// 3단계 프로세스를 카드 형태로 표시
const SolutionSection = () => {
  // 각 단계의 정보를 배열로 정의
  const features = [
    {
      icon: faCalendar, // 달력 아이콘
      title: "1. 할 일을 간단히 입력하세요",
      description: "제목과 예상 소요 시간만 적으면 끝!",
    },
    {
      icon: faBrain, // 뇌 아이콘
      title: "2. AI가 우선순위를 정해줘요",
      description: "Must(필수) → Should(권장) → Later(나중에)로 자동 분류",
    },
    {
      icon: faAlarmClock, // 시계 아이콘
      title: "3. 차트로 달성한 목표를 확인할 수 있어요!",
      description: "주간, 월간, 연간 차트를 제공합니다.",
    },
  ];

  return (
    <section className="home-bottom">
      {/* 섹션 제목 */}
      <div className="section-title">AI가 3단계로 해결해드려요</div>

      {/* 기능 카드들을 담는 컨테이너 */}
      <div className="bottom-box">
        {/* features 배열의 각 항목을 FeatureCard로 변환 */}
        {features.map((feature, index) => (
          <FeatureCard
            key={index} // 각 카드를 구분하기 위한 고유 키
            icon={feature.icon} // 표시할 아이콘
            title={feature.title} // 카드 제목
            description={feature.description} // 카드 설명
            delay={index * 150} // 순서대로 0ms, 150ms, 300ms 지연
          />
        ))}
      </div>
    </section>
  );
};

export default SolutionSection;
