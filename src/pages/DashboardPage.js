import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountManager from "../components/AccountManager";
// import Calculations from "../components/Calculations";
import PieChartDisplay from "../components/PieChartDisplay";
import Graphs from "../components/Graphs";
// import Loader from "react-loader-spinner";
import { commaValue } from "../helpers/commaValue";
import { calculateProjections } from "../helpers/calculateProjections";
import { useFetchHook } from "../hooks/fetch-hook";
import useWindowDimensions from "../hooks/window-hook";

const Calculations = React.lazy(() => import("../components/Calculations"));

const PortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  min-width: 100vw;
  /* overflow-x: scroll; */

  h2 {
    font-size: 3rem;
    font-weight: 500;
    color: var(--cultured-1);
    line-height: 1.6;
    letter-spacing: 1px;
  }

  p {
    margin-top: 1rem;
    font-size: 1rem;
    line-height: 1.8;
    font-weight: 600;
    font-family: "Open Sans", serif;
    color: var(--cadet-blue-crayola);

    span {
      font-size: 1.1rem;
      letter-spacing: 1px;
      margin-left: 0.6rem;
    }
  }

  .last-value {
    font-size: 0.8rem;
    width: 60%;
  }

  @media screen and (max-width: 2560px) {
  }

  @media screen and (max-width: 1023px) {
  }

  @media screen and (max-width: 768px) {
  }

  @media screen and (max-width: 425px) {
    h2 {
      font-size: 1.3rem;
      font-weight: 800;
      color: var(--light-gray);
      margin-top: 2rem;
    }
  }

  @media screen and (max-width: 375px) {
  }
`;

const PieChartContainer = styled.div`
  margin-top: 3rem;
  height: 25rem;
  width: 100vw;
  font-family: "Open Sans", serif;
  font-size: 1rem;

  @media screen and (max-width: 1023px) {
  }

  @media screen and (max-width: 768px) {
  }
`;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;

  @media screen and (max-width: 2560px) {
    width: 50%;
  }

  @media screen and (max-width: 1440px) {
    width: 90%;
  }

  @media screen and (max-width: 1023px) {
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;

    > div {
      margin-top: 5rem;

      h3 {
        font-size: 1rem;
      }
    }
  }

  @media screen and (max-width: 425px) {
    width: 100%;

    font-size: 0.8rem;
    transform: translateX(-1rem);

    > div {
      max-width: 100%;
    }
  }

  @media screen and (max-width: 375px) {
  }
`;

const PortfolioPage = ({ userId }) => {
  const [dataSet, setDataSet] = useState();
  const [loadedUser, setLoadedUser] = useState();
  const [calculatedProjections, setCalculatedProjections] = useState([]);
  const [monthlyAdd, setMonthlyAdd] = useState();
  const { sendRequest } = useFetchHook();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("calculations"));

    if (data?.length > 1) setCalculatedProjections(data);
  }, []);

  useEffect(() => {
    if (loadedUser?.accounts && calculatedProjections.length < 1) {
      if (dataSet !== undefined) {
        setCalculatedProjections(calculateProjections(dataSet, monthlyAdd));
      } else {
        setCalculatedProjections(calculateProjections(loadedUser, monthlyAdd));
      }
    }
  }, [dataSet, loadedUser, monthlyAdd, setLoadedUser, calculatedProjections]);

  useEffect(() => {
    localStorage.setItem("calculations", JSON.stringify(calculatedProjections));
  }, [calculatedProjections]);

  // Get user by Id
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userId}`,
          "GET"
        );
        setMonthlyAdd(responseData.user.monthlyIncrease);
        setLoadedUser(responseData.user);

        setDataSet({
          netWorth: responseData.user.netWorth,
          ageToRetire: responseData.user.ageToRetire,
          drawDownAmount: responseData.user.drawDownAmount,
          targetWorth: responseData.user.targetWorth,
          age: responseData.user.age,
        });
      } catch (err) {}
    };
    fetchUser();
  }, [setLoadedUser, sendRequest, userId]);

  const updatedCalculations = (updatedValues) => {
    setMonthlyAdd(parseFloat(updatedValues.monthlyAdd));

    setDataSet({
      ...dataSet,
      ageToRetire: parseFloat(updatedValues.retirementAge),
      targetWorth: parseFloat(updatedValues.retirementGoal),
      drawDownAmount: parseFloat(updatedValues.drawdown),
    });
  };

  const updateLoadedUser = (accounts, accId, deletion) => {
    let findAcc;
    if (deletion === true) {
      findAcc = accounts.filter((acc) => acc._id === accId);
    }

    let user = {
      ...loadedUser,
      netWorth: findAcc
        ? (loadedUser.netWorth -= parseFloat(findAcc[0].balance))
        : loadedUser.netWorth,
      accounts: accounts,
    };

    setLoadedUser(user);
  };

  const updateNetWorth = (accounts, netWorth) => {
    // Update networth straight from backend
    if (accounts === null) {
      setLoadedUser((prevState) => ({
        ...prevState,
        netWorth: netWorth,
      }));

      // if not available from backend then update from accounts list
    } else {
      let newNetWorth;
      if (accounts.length > 1) {
        newNetWorth = accounts.reduce(
          (a, sum) => (a += parseFloat(sum.balance)),
          0
        );
      } else {
        newNetWorth = accounts[0].balance;
      }

      setLoadedUser((prevState) => ({
        ...prevState,
        accounts: accounts,
        netWorth: newNetWorth,
      }));
    }
  };

  return (
    <PortfolioContainer>
      {loadedUser && (
        <>
          <h2>Portfolio</h2>

          <p>
            Your net worth is
            <span>
              {loadedUser?.currency}
              {commaValue(loadedUser?.netWorth) || 0}
            </span>
          </p>

          {/* Pie Chart Section */}
          {loadedUser.accounts.length > 0 && width > 425 && (
            <PieChartContainer>
              <PieChartDisplay accounts={loadedUser?.accounts} />
            </PieChartContainer>
          )}

          {loadedUser.accounts.length < 0 && <p>Start by adding accounts </p>}

          {/* Account Section */}
          <AccountManager
            accounts={loadedUser?.accounts}
            netWorth={loadedUser?.netWorth}
            updateLoadedUser={updateLoadedUser}
            updateNetWorth={updateNetWorth}
          />
          {/* Graph Section */}
          {loadedUser.accounts ? (
            <GraphContainer>
              {loadedUser.prevAccountDataSnapshots.length > 1 && (
                <Graphs
                  lastUpdated={loadedUser.lastUpdated}
                  data={loadedUser.accounts}
                  prevAccountDataSnapshots={
                    loadedUser?.prevAccountDataSnapshots
                  }
                  title={"NetWorth over (3) Months"}
                  accountList={loadedUser.accountList}
                />
              )}

              <Graphs
                projected
                lastUpdated={loadedUser?.lastUpdated || loadedUser.firstCreated}
                data={calculatedProjections && calculatedProjections}
                accountList={loadedUser?.accountList}
                prevAccountDataSnapshots={loadedUser?.prevAccountDataSnapshots}
                title={"Projected NetWorth"}
                targetWorth={loadedUser.targetWorth}
                currency={loadedUser.currency}
              />
            </GraphContainer>
          ) : (
            <p>Not enough data to produce graphs</p>
          )}
          {/* Calculations Section */}
          {calculatedProjections.length > 0 && (
            <Calculations
              data={calculatedProjections}
              accountInformation={loadedUser}
              updateCalcs={updatedCalculations}
            />
          )}
        </>
      )}
    </PortfolioContainer>
  );
};

export default PortfolioPage;
