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
import YourData from "./pages/YourData";

import Header from "./components/Header";
import { AuthenticationContext } from "./context/authenticate-context";
import { useLogin } from "./hooks/login-hook";
import Footer from "./components/Footer";
import SplashPage from "./pages/SplashPage";

// import { getPrevData } from "./helpers/graphCalcs";

function App() {
  const { token, login, logout, userId, firstTimeUser } = useLogin();

  let routes;
  // Fetch all user data for the logged in user

  if (token && userId) {
    // If the user has logged in for the first time redirect to this page
    if (firstTimeUser) {
      routes = (
        <>
          <Route path="/setup">
            <FirstTimeSetUp />
          </Route>
          <Route path="/yourdata">
            <YourData />
          </Route>
          <Redirect to="/setup" />
        </>
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
          <Route path="/splash">
            <SplashPage />
          </Route>
          <Route path="/">
            <DashboardPage userId={userId} />
          </Route>

          <Redirect to="/" />
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
        <Redirect to="/" />
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
          <main>{routes}</main>
          <Footer />
        </Router>
      </AuthenticationContext.Provider>
    </div>
  );
}

export default App;
