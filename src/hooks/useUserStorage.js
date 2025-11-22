import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// 사용자별 localStorage를 쉽게 관리할 수 있는 커스텀 훅
// key: 저장할 데이터의 키 이름 (예: 'todos', 'events', 'history')
// initialValue: 데이터가 없을 때 사용할 초기값 (기본값: 빈 배열)
export const useUserStorage = (key, initialValue = []) => {
  const { user } = useAuth();

  // 사용자별 고유 키 생성
  // 예: 'todos_user@gmail.com'
  const storageKey = user ? `${key}_${user.email}` : null;

  // 상태 초기화
  const [value, setValue] = useState(() => {
    // 로그인하지 않은 경우 초기값 반환
    if (!user || !storageKey) {
      return initialValue;
    }

    // localStorage에서 데이터 불러오기
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error("localStorage 데이터 불러오기 실패:", error);
      return initialValue;
    }
  });

  // value가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (user && storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(value));
      } catch (error) {
        console.error("localStorage 저장 실패:", error);
      }
    }
  }, [value, storageKey, user]);

  // 사용자가 변경되면 해당 사용자의 데이터로 다시 로드
  useEffect(() => {
    if (user && storageKey) {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          setValue(JSON.parse(stored));
        } else {
          setValue(initialValue);
        }
      } catch (error) {
        console.error("localStorage 데이터 불러오기 실패:", error);
        setValue(initialValue);
      }
    }
  }, [user, storageKey]); // initialValue는 의존성에서 제외 (무한 루프 방지)

  // [현재 값, 값을 변경하는 함수] 반환
  return [value, setValue];
};

// 사용 예시:
// const [todos, setTodos] = useUserStorage('todos', []);
// const [events, setEvents] = useUserStorage('events', []);
// const [history, setHistory] = useUserStorage('history', []);
