import React from "react";
import "../../components/Home/Home.style.css";
import HeroSection from "../../components/Home/HeroSection";
import ProblemSection from "../../components/Home/ProblemSection";
import SolutionSection from "../../components/Home/SolutionSection";
import CTASection from "../../components/Home/CTASection";
import Login from "../../components/Home/Login";
import Header from "../../components/common/Header";
const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <CTASection />
    </div>
  );
};

export default Home;
