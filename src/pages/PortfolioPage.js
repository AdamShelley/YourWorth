import React from "react";
import styled from "styled-components";
import AccountManager from "../components/AccountManager";
import Calculations from "../components/Calculations";
import PieChartDisplay from "../components/PieChartDisplay";
import { commaValue } from "../helpers/commaValue";

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

const PortfolioPage = ({ data }) => {
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
      <Calculations data={data} />
    </PortfolioContainer>
  );
};

export default PortfolioPage;
