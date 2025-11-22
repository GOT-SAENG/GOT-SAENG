import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // 입력 폼 데이터 관리
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 비밀번호 보기/숨기기 상태
  const [showPassword, setShowPassword] = useState(false);

  // 입력값이 변경될 때 실행되는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // localStorage에서 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // 이메일과 비밀번호로 사용자 찾기
    const user = users.find((u) => u.email === formData.email && u.password == formData.password);

    if (!user) {
      alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    }

    // 로그인 성공: 닉네임을 포함한 사용자 정보
    const userData = {
      email: user.email,
      nickname: user.nickname,
    };

    login(userData); // 로그인 처리

    navigate("/todo"); // 투두리스트 페이지로 이동
  };
  // 회원가입 페이지로 이동
  const handleRegisterClick = () => {
    navigate("/register");
  };
  return (
    <div className="auth-container">
      <div className="auth-box">
        <p className="auth-title">Welcome!</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* 이메일 입력 */}
          <div className="form-group">
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            {formData.email && !formData.email.includes("@") && <span className="error-txt">이메일 형식이 아닙니다.</span>}
          </div>

          {/* 비밀번호 입력 */}
          <div className="form-group">
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="password" required />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />}
              </button>
            </div>
            {formData.password && formData.password.length < 6 && <span className="error-txt">비밀번호를 입력해주세요.</span>}
          </div>

          {/* 비밀번호 찾기 */}
          <div className="forgot-password">
            <a href="#forgot">Forgot password?</a>
          </div>

          {/* 로그인 버튼 */}
          <button type="submit" className="auth-submit-btn">
            Login
          </button>
        </form>

        {/* 회원가입 링크 */}
        <div className="auth-footer">
          <span>Don't have an account? </span>
          <button className="auth-link-btn" onClick={handleRegisterClick}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
