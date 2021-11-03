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

//  FAKE DATA HERE - TO REPLACE WITH REAL DATABASE STUFF
const fakeData = {
  id: "Adam",
  age: 29,
  netWorth: 58000,
  targetWorth: 500000,
  targetWorthDateHit: "2042-01-01",
  ageToRetire: 50,
  drawDownAmount: 1700,
  lastUpdated: "2021-08-09",
  firstCreated: "2021-06-01",
  accountList: ["Vanguard", "Nationwide", "Moneybox"],
  accounts: [
    { name: "Vanguard", type: "Investments", amount: 45000 },
    {
      name: "Moneybox",
      type: "Checking",
      amount: 10000,
    },
    { name: "Nationwide", type: "Savings", amount: 3000 },
  ],
  prevAccountDataSnapshots: [
    {
      "2021-07-01": [
        { name: "Vanguard", type: "Investments", amount: 42000 },
        {
          name: "Moneybox",
          type: "Checking",
          amount: 9000,
        },
        { name: "Nationwide", type: "Savings", amount: 3000 },
      ],
    },
    {
      "2021-06-01": [
        { name: "Vanguard", type: "Investments", amount: 20000 },
        {
          name: "Moneybox",
          type: "Checking",
          amount: 8000,
        },
        { name: "Nationwide", type: "Savings", amount: 3000 },
      ],
    },
    {
      "2021-05-01": [
        { name: "Vanguard", type: "Investments", amount: 10000 },
        {
          name: "Moneybox",
          type: "Checking",
          amount: 7000,
        },
        { name: "Nationwide", type: "Savings", amount: 2900 },
      ],
    },
  ],
};

const tempUser = "617fba7d9ec83233a4c7ada0";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadedUser, setLoadedUser] = useState();
  const { sendRequest, loading, error } = useFetchHook();

  const login = useCallback(() => {
    console.log("logging in ");
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${tempUser}`,
          "GET"
        );

        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchUser();
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  console.log(loadedUser);
  // Fetch all user data for the logged in user

  console.log(isLoggedIn);
  if (isLoggedIn) {
    if (loadedUser?.firstTimeUser) {
      routes = (
        <>
          <Route path="/setup">
            <FirstTimeSetUp loadedUser={loadedUser} />
          </Route>
          <Redirect to="/setup" />
        </>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/account">
            <AccountPage data={loadedUser} />
          </Route>
          <Route path="/">
            <DashboardPage data={loadedUser} />
          </Route>
          <Redirect to="/"></Redirect>
        </Switch>
      );
    }
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

  console.log(loadedUser);

  return (
    <div className="App">
      <AuthenticationContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
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
