import React, { createContext, useContext, useEffect, useState } from "react";

// 로그인 상태를 전역으로 관리하는 Context
const AuthContext = createContext();

// 다른 컴포넌트에서 재활용하기 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
};

// 로그인 상태를 제공하는 Provider 컴포넌트
export const AuthProvider = ({ children }) => {
  // 로그인한 사용자 정보를 저장
  const [user, setUser] = useState(null);
  // 로딩 상태 관리
  const [loading, setLoading] = useState(true);

  // 페이지 새로고침 시 로그인 상태 유지
  // localStorage에서 사용자 정보 불러오기
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // 로그인 함수
  const login = (userData) => {
    // userData: {id, password, nickname}
    setUser(userData);
    // localStorage에 저장하여 새로고침해도 로그인 상태 유지
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 회원가입 함수
  const register = (userData) => {
    // 회원가입 후 자동으로 로그인 처리
    login(userData);
  };

  // 로그아웃 함수
  const logout = () => {
    setUser(null);
    // localStorage에서도 제거
    localStorage.removeItem("user");
  };

  // 로그인 여부 확인
  const isAuthenticated = () => {
    return user !== null;
  };

  // Context로 제공할 값들
  const value = {
    user, // 현재 로그인한 사용자 정보
    login, // 로그인 함수
    register, // 회원가입 함수
    logout, // 로그아웃 함수
    isAuthenticated, // 로그인 여부 확인 함수
    loading, // 로딩 상태
  };
  // 로딩중에는 아무것도 보여주지 않음
  if (loading) {
    return <div>Loading..</div>;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
