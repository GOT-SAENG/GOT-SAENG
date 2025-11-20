import React from "react";
import "./Home.style.css";

const Home = () => {
  return (
    <div className="home-container">
      <section className="home-header">
        <div className="main-text">
          <span>계획을 못짜서</span>
          <span>아무것도 못하는 당신에게</span>
        </div>
        <div className="sub-text">
          <span>AI가 오늘 할 일의 우선순위를 정해주고</span>
          <span>타임 블록까지자동으로 만들어 드려요</span>
        </div>
      </section>
      <section className="home-middle">
        <div className="middle-text">
          <span>이런 고민 있으신가요?</span>
        </div>
      </section>
    </div>
  );
};

export default Home;
