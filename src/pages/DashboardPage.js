import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountManager from "../components/AccountManager";
import Calculations from "../components/Calculations";
import PieChartDisplay from "../components/PieChartDisplay";
import Graphs from "../components/Graphs";
import { commaValue } from "../helpers/commaValue";
import { calculateProjections } from "../helpers/calculateProjections";

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

const PortfolioPage = ({ data }) => {
  const [dataSet, setDataSet] = useState(data);
  const [calculatedProjections, setCalculatedProjections] = useState([]);
  const [monthlyAdd, setMonthlyAdd] = useState(fakeMonthlyIncrease);

  useEffect(() => {
    setCalculatedProjections(calculateProjections(dataSet, monthlyAdd));
  }, [dataSet, monthlyAdd]);

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

  return (
    <PortfolioContainer>
      <h2>Portfolio</h2>
      <p>
        Your NET worth is <span>£{commaValue(data.netWorth)}</span>
      </p>
      <PieChartContainer>
        <PieChartDisplay accounts={data.accounts} />
      </PieChartContainer>
      <AccountManager accounts={data.accounts} />

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
          lastUpdated={dataSet.lastUpdated}
          data={calculatedProjections}
          accountList={dataSet.accountList}
          prevAccountDataSnapshots={dataSet.prevAccountDataSnapshots}
          title={"Projected NetWorth"}
          targetWorth={dataSet.targetWorth}
        />
      </GraphContainer>

      <Calculations
        data={calculatedProjections}
        accountInformation={dataSet}
        updateCalcs={updatedCalculations}
      />
    </PortfolioContainer>
  );
};

export default PortfolioPage;
