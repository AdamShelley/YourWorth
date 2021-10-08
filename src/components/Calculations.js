import React, { useState } from "react";
import styled from "styled-components";
import { StyledTable } from "../styles/tables";

import Input from "../components/Input.js";
import { calculateProjections } from "../helpers/calculateProjections";

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-top: 1rem;
  padding: 1rem 2rem;
  color: black;
  /* background-color: var(--davys-grey); */
  background-color: var(--cards);
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.2);
  margin-top: 10rem;

  h4 {
    color: var(--cultured);
    align-self: flex-start;
  }

  div {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

// FAKE VALUES

const Calculations = ({ data, updateCalcs, accountInformation }) => {
  const { ageToRetire, drawDownAmount, targetWorth } = accountInformation;

  const [monthlyAdd, setMonthlyAdd] = useState(1500);
  const [retirementGoal, setRetirementGoal] = useState(targetWorth);
  const [retirementAge, setRetirementAge] = useState(ageToRetire);
  const [drawdown, setDrawdown] = useState(drawDownAmount);

  const updateCalculations = () => {
    const vals = {
      monthlyAdd,
      retirementAge,
      retirementGoal,
      drawdown,
    };

    updateCalcs(vals);
  };

  return (
    <>
      <StyledInputContainer>
        <h4>Modify your projections</h4>
        <div>
          <Input
            label="Monthly Added"
            currentValue={monthlyAdd}
            updateVal={setMonthlyAdd}
            dataType="number"
          />
          <Input
            label="retirement goal amount"
            currentValue={retirementGoal}
            updateVal={setRetirementGoal}
            dataType="number"
          />
          <Input
            label="Target Retirement Age"
            currentValue={retirementAge}
            updateVal={setRetirementAge}
            dataType="number"
          />
          <Input
            label="Drawdown per month"
            currentValue={drawdown}
            updateVal={setDrawdown}
            dataType="number"
          />
        </div>
        <button type="submit" onClick={updateCalculations}>
          Update
        </button>
      </StyledInputContainer>
      <StyledTable fullscreen>
        {/* <caption>Projection</caption> */}

        <thead>
          <tr>
            <th>Year</th>
            <th>Age</th>
            <th>Total</th>
            <th>3%</th>
            <th>5%</th>
            <th>7%</th>
            <th>10%</th>
            <th>Monthly</th>
          </tr>
        </thead>
        <tbody>
          {data.map((year, index) => {
            const targetYearHit = year.age === retirementAge;

            return (
              <tr
                key={`table-number: ${index}`}
                className={targetYearHit ? "target-year-hit" : ""}
              >
                <td>{year.year}</td>
                <td>{year.age}</td>
                <td>
                  £
                  {year.total.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td
                  className={
                    year.three >= targetWorth && !targetYearHit
                      ? "target-worth-hit"
                      : targetYearHit
                      ? "target-year-hit-box"
                      : ""
                  }
                >
                  £
                  {year.three.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td
                  className={
                    year.five >= targetWorth && !targetYearHit
                      ? "target-worth-hit"
                      : targetYearHit
                      ? "target-year-hit-box"
                      : ""
                  }
                >
                  £
                  {year.five.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td
                  className={
                    year.seven >= targetWorth && !targetYearHit
                      ? "target-worth-hit"
                      : targetYearHit
                      ? "target-year-hit-box"
                      : ""
                  }
                >
                  £
                  {year.seven.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td
                  className={
                    year.ten >= targetWorth && !targetYearHit
                      ? "target-worth-hit"
                      : targetYearHit
                      ? "target-year-hit-box"
                      : ""
                  }
                >
                  £
                  {year.ten.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  £
                  {year.monthlyAdd.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <div style={{ marginBottom: "20vh" }}></div>
    </>
  );
};

export default Calculations;
