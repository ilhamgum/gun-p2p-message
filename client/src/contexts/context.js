import React, { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);

  function isLogin() {
    setAuth(!auth);
  }

  return (
    <AuthContext.Provider value={{ isLogin, auth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
