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
import { useLogin } from "./hooks/login-hook";
import Footer from "./components/Footer";

// import { getPrevData } from "./helpers/graphCalcs";

function App() {
  const { token, login, logout, userId } = useLogin();

  let routes;
  // Fetch all user data for the logged in user
  if (token && userId) {
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
          <main>{routes}</main>
          <Footer />
        </Router>
      </AuthenticationContext.Provider>
    </div>
  );
}

export default App;
