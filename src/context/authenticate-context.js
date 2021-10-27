import { createContext } from "react";

export const AuthenticationContext = createContext({
  isloggedin: false,
  login: () => {},
  logout: () => {},
});
