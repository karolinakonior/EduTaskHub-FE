import { createContext, useState } from "react";
import React from "react";

export const UserContext = createContext({});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
