import React, { createContext, useContext, useState } from 'react';

// 기본값 설정
const defaultUser = {
  user: {},
  setInfo: () => {}
};

// 컨텍스트 생성
const UserContext = createContext(defaultUser);

// 컨텍스트 제공자
export const UserProvider = ({ children }) => {
  const [user, setInfo] = useState({});

  return (
    <UserContext.Provider value={{ user, setInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// 컨텍스트 소비를 위한 커스텀 훅
export const useUser = () => useContext(UserContext);
