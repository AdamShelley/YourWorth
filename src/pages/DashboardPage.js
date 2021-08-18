import React from "react";
import styled from "styled-components";

import NetWorth from "../components/NetWorth";
import Accounts from "../components/Accounts";
import Graphs from "../components/Graphs";
import PieChartDisplay from "../components/PieChartDisplay";

const StyledMainContainer = styled.main`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const PieChartContainer = styled.div`
  height: 25rem;
  width: 50rem;
`;

const DashboardPage = ({ data }) => {
  return (
    <StyledMainContainer>
      <NetWorth
        total={data.netWorth}
        targetWorth={data.targetWorth}
        dateUpdated={data.lastUpdated}
        targetWorthHit={data.targetWorthDateHit}
      />

      {/* <Graphs
        lastUpdated={data.lastUpdated}
        data={data.accounts}
        prevAccountDataSnapshots={data.prevAccountDataSnapshots}
      /> */}
      <PieChartContainer>
        <PieChartDisplay accounts={data.accounts} />
      </PieChartContainer>
      <Accounts accounts={data.accounts} />
    </StyledMainContainer>
  );
};

export default DashboardPage;
