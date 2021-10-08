import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/AccountPage";
import Header from "./components/Header";

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

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/account">
            <AccountPage data={fakeData} />
          </Route>

          <Route path="/">
            <DashboardPage data={fakeData} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;