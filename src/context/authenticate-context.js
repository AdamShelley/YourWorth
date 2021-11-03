import { createContext } from "react";

export const AuthenticationContext = createContext({
  isLoggedin: false,
  login: () => {},
  logout: () => {},
});
