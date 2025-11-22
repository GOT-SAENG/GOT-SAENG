import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import "./MyPage.css";

const Mypage = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const fileInputRef = useRef(null);

  // 프로필 이미지 상태
  const [profileImage, setProfileImage] = useState(localStorage.getItem(`profile${user.email}`) || null);

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    nickname: user.nickname,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 비밀번호 보기/숨기기 상태
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 프로필 이미지 변경 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 선택 버튼 클릭
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  //비밀번호 토글
  const togglePassword = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  // 저장 버튼 클릭
  const handleSubmit = (e) => {
    e.preventDefault();

    // localStorage에서 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u) => u.email === user.email);

    if (userIndex === -1) {
      alert("사용자 정보를 찾을 수 없습니다.");
      return;
    }

    // 비밀번호 변경이 있는 경우
    if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
      // 현재 비밀번호 확인
      if (users[userIndex].password !== formData.currentPassword) {
        alert("현재 비밀번호가 일치하지 않습니다.");
        return;
      }

      // 새 비밀번호 확인
      if (formData.newPassword !== formData.confirmPassword) {
        alert("새 비밀번호가 일치하지 않습니다.");
        return;
      }

      if (formData.newPassword.length < 8) {
        alert("비밀번호는 10자 이상이어야 합니다.");
        return;
      }

      users[userIndex].password = formData.newPassword; // 비밀번호 업데이트
    }
    users[userIndex].nickname = formData.nickname; // 닉네임 업데이트
    localStorage.setItem("users", JSON.stringify(users)); // 로컬스토리지에 저장

    // 프로밀 이미지 저장
    if (profileImage) {
      localStorage.setItem(`profile_${user.email}`, profileImage);
    }

    // 현재 로그인 정보 업데이트
    login({
      email: user.email,
      nickname: formData.nickname,
    });

    alert("정보가 수정되었습니다.");

    // 폼 초기화
    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };
  return (
    <div className="mypage-container">
      <div className="mypage-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← 뒤로가기
        </button>
        <h2>마이페이지</h2>
      </div>

      <div className="mypage-content">
        {/* 프로필 이미지 섹션 */}
        <div className="profile-section">
          <div className="profile-image-wrapper" onClick={handleImageClick}>
            {profileImage ? (
              <img src={profileImage} alt="프로필" className="profile-image" />
            ) : (
              <div className="profile-placeholder">
                <span className="profile-initial">{formData.nickname.charAt(0)}</span>
              </div>
            )}
            <div className="image-edit-icon">
              <FontAwesomeIcon icon={faCamera} />
            </div>
          </div>
          <p className="image-edit-text">이미지 수정</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
        </div>

        {/* 정보 수정 폼 */}
        <form onSubmit={handleSubmit} className="mypage-form">
          {/* 이메일 (읽기 전용) */}
          <div className="form-section">
            <label className="form-label">이메일</label>
            <input type="email" value={user.email} className="form-input readonly" readOnly disabled />
          </div>

          {/* 닉네임 */}
          <div className="form-section">
            <label className="form-label">닉네임</label>
            <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} className="form-input" placeholder="닉네임을 입력하세요" required />
          </div>

          {/* 비밀번호 변경 섹션 */}
          <div className="password-change-section">
            <h3 className="section-area">비밀번호 변경</h3>
            <p className="section-description">영문, 숫자를 포함한 6자 이상으로 입력해주세요.</p>

            {/* 현재 비밀번호 */}
            <div className="form-section">
              <label className="form-label">현재 비밀번호</label>
              <div className="password-wrapper">
                <input type={showPasswords.current ? "text" : "password"} name="currentPassword" value={formData.currentPassword} onChange={handleChange} className="form-input" placeholder="현재 비밀번호" />
                <button type="button" className="password-toggle" onClick={() => togglePassword("current")}>
                  {showPasswords.current ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />}
                </button>
              </div>
            </div>

            {/* 새 비밀번호 */}
            <div className="form-section">
              <label className="form-label">새 비밀번호</label>
              <div className="password-wrapper">
                <input type={showPasswords.new ? "text" : "password"} name="newPassword" value={formData.newPassword} onChange={handleChange} className="form-input" placeholder="새 비밀번호 등록" />
                <button type="button" className="password-toggle" onClick={() => togglePassword("new")}>
                  {showPasswords.new ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />}
                </button>
              </div>
            </div>

            {/* 새 비밀번호 확인 */}
            <div className="form-section">
              <label className="form-label">새 비밀번호 확인</label>
              <div className="password-wrapper">
                <input type={showPasswords.confirm ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="form-input" placeholder="새 비밀번호 확인" />
                <button type="button" className="password-toggle" onClick={() => togglePassword("confirm")}>
                  {showPasswords.confirm ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />}
                </button>
              </div>
              {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && <span className="error-text">비밀번호를 다시 확인해 새 비밀번호와 다시 로그인하세요.</span>}
            </div>
          </div>

          {/* 저장 버튼 */}
          <button type="submit" className="save-btn">
            저장하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Mypage;
