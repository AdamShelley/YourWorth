import React from "react";
import styled from "styled-components";

import NetWorth from "../components/NetWorth";
import Accounts from "../components/Accounts";
import Graphs from "../components/Graphs";

const StyledMainContainer = styled.main`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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
      <Accounts accounts={data.accounts} />
      <Graphs
        lastUpdated={data.lastUpdated}
        data={data.accounts}
        prevAccountDataSnapshots={data.prevAccountDataSnapshots}
      />
    </StyledMainContainer>
  );
};

export default DashboardPage;
