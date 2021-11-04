import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountManager from "../components/AccountManager";
import Calculations from "../components/Calculations";
import PieChartDisplay from "../components/PieChartDisplay";
import Graphs from "../components/Graphs";
import { commaValue } from "../helpers/commaValue";
import { calculateProjections } from "../helpers/calculateProjections";
import { useFetchHook } from "../hooks/fetch-hook";

const PortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h2 {
    font-size: 2.5rem;
    font-weight: 100;
    color: var(--cultured-1);
    line-height: 1.6;
  }

  p {
    margin-top: 1rem;
    font-size: 1rem;

    span {
      color: var(--light-gray);
      font-size: 1.4rem;
      letter-spacing: 1px;
      margin-left: 0.6rem;
    }
  }
`;

const PieChartContainer = styled.div`
  height: 25rem;
  width: 50rem;
`;

const GraphContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
`;

// Make this dynamic later
const fakeMonthlyIncrease = 1000;

const PortfolioPage = ({ data, userId }) => {
  const [dataSet, setDataSet] = useState(data);
  const [loadedUser, setLoadedUser] = useState();
  const [calculatedProjections, setCalculatedProjections] = useState([]);
  const [monthlyAdd, setMonthlyAdd] = useState(fakeMonthlyIncrease);
  const { sendRequest, error, loading } = useFetchHook();

  useEffect(() => {
    if (dataSet)
      setCalculatedProjections(calculateProjections(dataSet, monthlyAdd));
  }, [dataSet, monthlyAdd]);

  // Get user by Id

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userId}`,
          "GET"
        );

        console.log(responseData.user);
        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchUser();
  }, []);

  const updatedCalculations = (updatedValues) => {
    setMonthlyAdd(parseFloat(updatedValues.monthlyAdd));

    setDataSet({
      ...dataSet,
      ageToRetire: parseFloat(updatedValues.retirementAge),
      targetWorth: parseFloat(updatedValues.retirementGoal),
      drawDownAmount: parseFloat(updatedValues.drawdown),
    });

    console.log(dataSet);
  };

  console.log(loadedUser);

  return (
    <PortfolioContainer>
      {loadedUser ? (
        <>
          <h2>Portfolio</h2>
          <p>Hello {loadedUser.name || "blank"}</p>
          <p>
            Your NET worth is <span>£{loadedUser.netWorth || 0}</span>
          </p>
          <PieChartContainer>
            <PieChartDisplay accounts={loadedUser?.accounts} />
          </PieChartContainer>
          <AccountManager accounts={loadedUser?.accounts} />
          {/* {data.accounts ? (
            <GraphContainer>
              <Graphs
                lastUpdated={data.lastUpdated}
                data={data.accounts}
                accountList={data.accountList}
                prevAccountDataSnapshots={data.prevAccountDataSnapshots}
                title={"NetWorth over (3) Months"}
              />

              <Graphs
                projected
                lastUpdated={dataSet?.lastUpdated}
                data={calculatedProjections && calculatedProjections}
                accountList={dataSet?.accountList}
                prevAccountDataSnapshots={dataSet?.prevAccountDataSnapshots}
                title={"Projected NetWorth"}
                targetWorth={dataSet?.targetWorth}
              />
            </GraphContainer>
          ) : (
            <p>Not enough data to produce graphs</p>
          )} */}
          {dataSet && (
            <Calculations
              data={calculatedProjections}
              accountInformation={dataSet}
              updateCalcs={updatedCalculations}
            />
          )}
        </>
      ) : (
        <p>Not reading data correctly</p>
      )}
    </PortfolioContainer>
  );
};

export default PortfolioPage;
