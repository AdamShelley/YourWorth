import React from "react";
import styled from "styled-components";

const StyledDataPage = styled.div`
  display: flex;
  align-items: center;

  min-height: 100vh;
`;

const YourData = () => {
  return (
    <StyledDataPage>
      Your data is here private policy, Cookies etc
    </StyledDataPage>
  );
};

export default YourData;
