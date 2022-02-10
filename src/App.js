import React, { Suspense } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Loader from "react-loader-spinner";
import DashboardPage from "./pages/DashboardPage";
import SignupPage from "./pages/SignupPage";
// import SplashPage from "./pages/SplashPage";
// import YourData from "./pages/YourData";
// import AccountPage from "./pages/AccountPage";
// import FirstTimeSetUp from "./pages/FirstTimeSetUp";

import Header from "./components/Header";
import { AuthenticationContext } from "./context/authenticate-context";
import { useLogin } from "./hooks/login-hook";
import Footer from "./components/Footer";

// import { getPrevData } from "./helpers/graphCalcs";

const AccountPage = React.lazy(() => import("./pages/AccountPage"));
const FirstTimeSetUp = React.lazy(() => import("./pages/FirstTimeSetUp"));
const YourData = React.lazy(() => import("./pages/YourData"));
const SplashPage = React.lazy(() => import("./pages/SplashPage"));

function App() {
  const { token, login, logout, userId, firstTimeUser } = useLogin();

  let routes;
  // Fetch all user data for the logged in user

  if (token && userId) {
    // If the user has logged in for the first time redirect to this page
    if (firstTimeUser) {
      routes = (
        <Switch>
          <Route path="/setup">
            <FirstTimeSetUp />
          </Route>
          <Route path="/yourdata">
            <YourData />
          </Route>
          <Redirect to="/setup" loadedUser={userId} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/account">
            <AccountPage userId={userId} />
          </Route>
          <Route path="/yourdata">
            <YourData />
          </Route>
          <Route path="/splash" exact>
            <SplashPage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage userId={userId} />
          </Route>

          <Redirect to="/dashboard" />
        </Switch>
      );
    }
  } else {
    routes = (
      <Switch>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/yourdata">
          <YourData />
        </Route>
        <Route path="/splash">
          <SplashPage />
        </Route>
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
          firstTimeUser: firstTimeUser,
        }}
      >
        <Router>
          <Header />
          <main>
            <Suspense
              fallback={
                <div>
                  <Loader type="Rings" color="#00BFFF" height={80} width={80} />
                </div>
              }
            >
              {routes}
            </Suspense>
          </main>
          <Footer />
        </Router>
      </AuthenticationContext.Provider>
    </div>
  );
}

export default App;
