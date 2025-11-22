import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  // 입력 폼 데이터를 관리
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // 비밀번호 보기/숨기기 상태
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 입력값이 변경될 때 실행되는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 비밀번호 확인 검증
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다");
      return;
    }

    // 기존 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // 이메일 중복 체크
    const exitstringUser = users.find((user) => user.email === formData.email);
    if (exitstringUser) {
      alert("이미 가입된 이메일입니다. ");
      return;
    }

    // 새 사용자 정보
    const newUser = {
      email: formData.email,
      password: formData.password,
      nickname: formData.name,
    };

    // 사용자 목록에 추가
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const userData = {
      email: formData.email,
      nickname: formData.name,
    };

    register(userData); // 회원가입 처리 (자동으로 로그인됨)

    navigate("/todo"); // 투두리스트 페이지로 이동
  };

  // 로그인 페이지로 이동
  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <p className="auth-title">Create account!</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* 이름 입력 */}
          <div className="form-group">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          </div>

          {/* 이메일 입력 */}
          <div className="form-group">
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            {formData.email && !formData.email.includes("@") && <span className="error-text">이메일 형식을 맞춰주세요.</span>}
          </div>

          {/* 비밀번호 입력 */}
          <div className="form-group">
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />}
              </button>
            </div>
          </div>

          {/* 비밀번호 확인 입력 */}
          <div className="form-group">
            <div className="password-wrapper">
              <input type={showPasswordConfirm ? "text" : "password"} name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} placeholder="Confirm password" required />
              <button type="button" className="password-toggle" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                {showPasswordConfirm ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />}
              </button>
            </div>
            {formData.passwordConfirm && formData.password !== formData.passwordConfirm && <span className="error-text">비밀번호가 다릅니다.</span>}
          </div>

          {/* 회원가입 버튼 */}
          <button type="submit" className="auth-submit-btn">
            Register
          </button>
        </form>

        {/* 로그인 링크 */}
        <div className="auth-footer">
          <span>You have account? </span>
          <button className="auth-link-btn" onClick={handleLoginClick}>
            Login now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
