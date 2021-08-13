import React from "react";
import styled from "styled-components";
import { commaValue } from "../helpers/commaValue";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50vw;
  height: 20vh;
  margin-top: 2rem;
  color: var(--cultured);
  border-radius: 5px;
  font-family: "Open Sans", sans-serif;
  border: 1px solid var(--light-gray);
  background-color: var(--charleston-green);

  p {
    font-size: 1rem;
    font-weight: 100;

    span {
      font-weight: 300;
      color: var(--cultured-2);
      border-bottom: 1px solid var(--cultured-2);
      letter-spacing: 1px;
      margin-left: 0.5rem;
    }
  }

  h4 {
    margin: 1rem;
    margin-top: 2rem;
    font-size: 3rem;
    font-weight: 300;
    letter-spacing: 1px;
  }
`;

const NetWorth = ({ total, dateUpdated, targetWorth, targetWorthHit }) => {
  return (
    <StyledContainer>
      <p>
        Your net worth as of <span>{dateUpdated}</span>
      </p>

      <h4>£{commaValue(total)}</h4>

      <p>
        You are on target to reach your goal of £{commaValue(targetWorth)} by{" "}
        {targetWorthHit}, (10,460 Days).
      </p>
    </StyledContainer>
  );
};

export default NetWorth;
