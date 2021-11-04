import { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/AccountPage";
import SignupPage from "./pages/SignupPage";
import FirstTimeSetUp from "./pages/FirstTimeSetUp";

import Header from "./components/Header";
import { AuthenticationContext } from "./context/authenticate-context";
import { useFetchHook } from "./hooks/fetch-hook";

// import { getPrevData } from "./helpers/graphCalcs";

function App() {
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, []);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  console.log(token);

  let routes;
  // Fetch all user data for the logged in user
  if (token) {
    // if (loadedUser?.firstTimeUser) {
    //   routes = (
    //     <>
    //       <Route path="/setup">
    //         <FirstTimeSetUp />
    //       </Route>
    //       <Redirect to="/setup" />
    //     </>
    //   );
    // } else {
    routes = (
      <Switch>
        <Route path="/account">
          <AccountPage userId={userId} />
        </Route>
        <Route path="/">
          <DashboardPage userId={userId} />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
    // }
  } else {
    routes = (
      <Switch>
        <Route path="/signup">
          <SignupPage />
        </Route>
        {/* <Route path="/">
          <DashboardPage noUser />
        </Route> */}
        <Redirect to="/signup" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <AuthenticationContext.Provider
        value={{
          isLoggedIn: !!token,
          login: login,
          logout: logout,
          token: token,
          userId: userId,
        }}
      >
        <Router>
          <Header />
          {routes}
        </Router>
      </AuthenticationContext.Provider>
    </div>
  );
}

export default App;
