import { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const useLogin = () => {
  const [userId, setUserId] = useState(false);
  const [tokenExpiration, setTokenExpiration] = useState();
  const [token, setToken] = useState(false);
  const [firstTimeUser, setFirstTimeUser] = useState();

  const login = useCallback((uid, token, initialSetup, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpireDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 120);
    setTokenExpiration(tokenExpireDate);
    setFirstTimeUser(initialSetup);

    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpireDate.toISOString(),
        firstTimeUser: initialSetup,
      })
    );
  }, []);

  // Logout the user on the frontend
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpiration(null);
    setUserId(null);
    setFirstTimeUser(null);
    localStorage.removeItem("userData");
  }, []);

  // Handle the token expiration date
  useEffect(() => {
    if (token && tokenExpiration) {
      const remaining = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remaining);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpiration]);

  // Handle the case where a valid token hasn't expired
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));

    console.log(storedData);
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        storedData.firstTimeUser,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, firstTimeUser };
};
