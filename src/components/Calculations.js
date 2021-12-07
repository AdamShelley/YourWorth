import React from "react";
import styled from "styled-components";
import { StyledTable } from "../styles/tables";

import Input from "../components/Input.js";

import { useForm } from "../hooks/form-hook";

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

  div > div > input {
    background-color: var(--cultured-2);
    width: 75%;
    box-shadow: none;
    height: 2.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 2px;
    border: 1px solid var(--slate-gray);
    background-color: var(--card-header);
    color: var(--cultured);
    margin: 1rem;

    &:hover {
      border: 1px solid var(--cadet-blue-crayola);
    }
  }
`;

const Calculations = ({ data, updateCalcs, accountInformation }) => {
  const { ageToRetire, drawDownAmount, targetWorth } = accountInformation;

  const [formState, inputHandler] = useForm(
    {
      monthlyIncrease: {
        value: "",
        valid: false,
      },
      retirementAge: {
        value: "",
        valid: false,
      },
      targetNetWorth: {
        value: "",
        valid: false,
      },
      drawdown: {
        value: "",
        valid: false,
      },
    },
    false
  );

  const updateCalculations = () => {
    const vals = {
      monthlyAdd: formState.inputs.monthlyIncrease.value,
      retirementAge: formState.inputs.retirementAge.value,
      retirementGoal: formState.inputs.targetNetWorth.value,
      drawdown: formState.inputs.drawdown.value,
    };

    updateCalcs(vals);
  };

  return (
    <>
      <StyledInputContainer>
        <h4>Modify your projections</h4>
        <div>
          <Input
            id="monthlyIncrease"
            label="Monthly Added"
            dataType="number"
            onInput={inputHandler}
            validators={[]}
            initialValid={formState.inputs.monthlyIncrease.valid}
            initialValue={1000}
            darkInputLighter
          />
          <Input
            id="retirementAge"
            label="Target Age"
            dataType="number"
            onInput={inputHandler}
            initialValid={formState.inputs.retirementAge.valid}
            initialValue={ageToRetire}
            validators={[]}
            darkInputLighter
          />
          <Input
            id="targetNetWorth"
            label="Target Net Worth"
            dataType="number"
            onInput={inputHandler}
            initialValid={formState.inputs.targetNetWorth.valid}
            initialValue={targetWorth}
            validators={[]}
            darkInputLighter
          />
          <Input
            id="drawdown"
            label="Drawdown per month"
            dataType="number"
            onInput={inputHandler}
            initialValid={formState.inputs.drawdown.valid}
            initialValue={drawDownAmount}
            validators={[]}
            darkInputLighter
          />
        </div>
        <div>
          <button type="submit" onClick={updateCalculations}>
            Update
          </button>
          <button>Reset</button>
        </div>
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
            const targetYearHit = year.age === ageToRetire;

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
