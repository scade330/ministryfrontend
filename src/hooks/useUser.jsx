// src/hooks/useUser.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGIN FUNCTION
  const login = useCallback((userData, tokenValue, expiresIn) => {
    const expirationTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem("expirationTime", expirationTime.toString());
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenValue);
    setUser(userData);
    setToken(tokenValue);
  }, []);

  // LOGOUT FUNCTION
  const logout = useCallback(() => {
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }, []);

  // AUTO LOGIN ON REFRESH
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedExpiration = localStorage.getItem("expirationTime");

    if (storedUser && storedToken && storedExpiration) {
      const expiresIn = parseInt(storedExpiration) - new Date().getTime();
      if (expiresIn > 0) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);

        // auto logout when token expires
        const timer = setTimeout(() => logout(), expiresIn);
        return () => clearTimeout(timer);
      } else {
        logout(); // expired
      }
    }
    setLoading(false);
  }, [logout]);

  return (
    <UserContext.Provider value={{ user, token, setUser, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserContext;
