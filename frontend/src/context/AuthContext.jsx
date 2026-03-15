import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, name, email }

  const login = (email) => {
    const trimmed = email.trim();
    if (!trimmed) return;
    // Simple demo user; in a real app call backend auth here
    setUser({
      id: trimmed.toLowerCase(), // use email as user id
      name: trimmed.split("@")[0],
      email: trimmed,
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

