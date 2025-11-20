import React from "react";
import "./Home.style.css";
import { faAlarmClock, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="home-container">
      <section className="home-header">
        <div className="main-area">
          <span>계획을 못짜서</span>
          <span>아무것도 못하는 당신에게</span>
        </div>
        <div className="sub-text">
          <span>AI가 오늘 할 일의 우선순위를 정해주고</span>
          <span>타임 블록까지자동으로 만들어 드려요</span>
        </div>
      </section>
      <section className="home-middle">
        <div className="middle-area">
          <span>이런 고민 있으신가요?</span>
        </div>
        <div className="middle-box">
          <div className="card">할 일은 많은데 뭐 부터 해야 할 지 모르겠어요</div>
          <div className="card">중요한 일은 미루고 쉬운 것만 하게 돼요</div>
          <div className="card">공부, 운동, 취미 다 하고 싶은데.. 시간이 부족해요</div>
          <div className="card">매일 "오늘도 못했다"는 생각이 들어요..</div>
        </div>
      </section>
      <section className="home-bottom">
        <div className="bottom-area">
          <span>AI가 3단계로 해결해드려요</span>
        </div>
        <div className="bottom-box">
          <div className="card">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faCalendar} />
            </div>
            <div className="card-content">
              <div className="card-title">1. 할 일을 간단히 입력하세요</div>
              <span className="card-description">제목과 예상 소요 시간만 적으면 끝!</span>
            </div>
          </div>
          <div className="card">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faBrain} />
            </div>
            <div className="card-content">
              <div className="card-title">2. AI가 우선 순위를 정해줘요.</div>
              <span className="card-description">Must(필수) → Should(권장) → Later(나중에)로 자동 분류</span>
            </div>
          </div>
          <div className="card">
            <div className="icon-circle">
              <FontAwesomeIcon icon={faAlarmClock} />
            </div>
            <div className="card-content">
              <div className="card-title">3. 차트로 달성한 목표를 확인 할 수 있어요!</div>
              <span className="card-description">주간, 월간, 연간 차트를 제공합니다.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
