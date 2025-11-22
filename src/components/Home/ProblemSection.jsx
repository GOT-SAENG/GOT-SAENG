import React from "react";
import ProblemCard from "./ProblemCard";

// 사용자의 고민을 보여주는 섹션 컴포넌트
// 여러 개의 문제 카드를 그리드 형태로 배치
const ProblemsSection = () => {
  // 보여줄 문제들을 배열로 정의
  const problems = ["할 일은 많은데 뭐부터 해야 할지 모르겠어요", "중요한 일은 미루고 쉬운 것만 하게 돼요", "공부, 운동, 취미 다 하고 싶은데.. 시간이 부족해요", "매일 '오늘도 못했다'는 생각이 들어요.."];

  return (
    <section className="home-middle">
      {/* 섹션 제목 */}
      <div className="section-title">이런 고민 있으신가요?</div>

      {/* 문제 카드들을 담는 그리드 컨테이너 */}
      <div className="middle-box">
        {/* problems 배열의 각 항목을 ProblemCard로 변환 */}
        {problems.map((problem, index) => (
          <ProblemCard
            key={index} // 각 카드를 구분하기 위한 고유 키
            text={problem} // 카드에 표시할 텍스트
            delay={index * 100} // 순서대로 0ms, 100ms, 200ms, 300ms 지연
          />
        ))}
      </div>
    </section>
  );
};

export default ProblemsSection;
