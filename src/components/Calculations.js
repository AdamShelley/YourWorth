import React, { useState } from "react";
import styled from "styled-components";
import { StyledTable } from "../styles/tables";
import useWindowDimensions from "../hooks/window-hook";
import Input from "../components/Input.js";
import { ButtonStyled } from "../styles/inputStyles";
import { useForm } from "../hooks/form-hook";

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin-top: 1rem;
  padding: 1rem 2rem;
  color: black;
  background-color: var(--cards);
  margin-top: 10rem;
  font-family: "Open Sans", serif;
  border: 1px solid var(--card-header);
  border-radius: 3px;

  h4 {
    color: var(--gainsboro);
    font-family: "Open Sans", serif;
    font-weight: 500;
    align-self: flex-start;
    letter-spacing: 0.5px;
  }

  div {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  div > div > label {
    font-weight: 200;
    font-size: 0.9rem;
    padding: 0.2rem;
  }

  div > div > input {
    background-color: var(--cultured-2);
    width: 75%;
    height: 2.5rem;
    font-size: 0.9rem;
    text-align: center;
    font-weight: 500;
  }

  button {
    margin: 1rem;
    padding: 1.2rem 1rem;
    color: var(--cultured);
    background-color: var(--charleston-green);
    width: 15%;
    height: 1.2rem;
    display: flex;
    align-items: center;

    &:hover {
      border: 1px solid var(--cadet-blue-crayola);
    }
  }

  @media screen and (max-width: 2560px) {
    width: 30%;
  }

  @media screen and (max-width: 2000px) {
    width: 50%;
  }

  @media screen and (max-width: 1440px) {
    width: 60%;
  }

  @media screen and (max-width: 1024px) {
    width: 84%;

    div > div > label {
      font-size: 0.7rem;
    }
  }

  @media screen and (max-width: 768px) {
  }

  @media screen and (max-width: 425px) {
    width: 95%;
    padding: 1rem 0.5rem;
    margin-top: 5rem;

    > div {
      align-items: flex-end;

      > div {
        justify-content: space-between;

        label {
          width: 95%;
          font-size: 0.8rem;
          /* align-self: flex-start; */
        }
        input {
          width: 95%;
          margin-top: 0.2rem;
        }
      }

      > button {
        width: 30%;
      }
    }
  }

  @media screen and (max-width: 375px) {
  }
`;

const Calculations = ({ data, updateCalcs, accountInformation }) => {
  const { ageToRetire, drawDownAmount, targetWorth, monthlyIncrease } =
    accountInformation;
  const { width } = useWindowDimensions();

  const [resetTriggered, setResetTriggered] = useState(false);

  const [originalValues] = useState({
    monthlyAdd: monthlyIncrease,
    retirementAge: ageToRetire,
    retirementGoal: targetWorth,
    drawdown: drawDownAmount,
  });

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
      monthlyAdd: parseFloat(formState.inputs.monthlyIncrease.value),
      retirementAge: parseFloat(formState.inputs.retirementAge.value),
      retirementGoal: parseFloat(formState.inputs.targetNetWorth.value),
      drawdown: parseFloat(formState.inputs.drawdown.value),
    };

    updateCalcs(vals);
  };

  const CustomTD = ({
    number,
    noFormat,
    targetYearHit,
    currency,
    drawDown,
  }) => {
    let formattedNumber = number;
    if (!noFormat && number > 0) {
      formattedNumber = number.toLocaleString("en-us", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else if (!noFormat) {
      formattedNumber = 0;
    }

    if (drawDown) {
      formattedNumber = -`${number}`;
    }

    let styles =
      number >= parseFloat(formState.inputs.targetNetWorth.value) &&
      !targetYearHit
        ? "target-worth-hit"
        : targetYearHit
        ? "target-year-hit-box"
        : "";

    return (
      <td className={styles}>
        {currency}
        {formattedNumber}
      </td>
    );
  };

  const resetCalculations = () => {
    updateCalcs(originalValues);
    setResetTriggered(true);
  };

  return (
    <>
      <StyledInputContainer>
        <h4>
          Modify your projections ( this will not update your data permanently )
        </h4>
        {/* Inputs to change calculations */}
        <div>
          <Input
            id="monthlyIncrease"
            label="Monthly Added"
            dataType="number"
            onInput={inputHandler}
            resetFalse={() => setResetTriggered(false)}
            validators={[]}
            initialValid={formState.inputs.monthlyIncrease.valid}
            initialValue={monthlyIncrease}
            darkInputLighter
            reset={resetTriggered}
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
            reset={resetTriggered}
            resetFalse={() => setResetTriggered(false)}
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
            reset={resetTriggered}
            resetFalse={() => setResetTriggered(false)}
          />
          <Input
            id="drawdown"
            label="Drawdown (per month)"
            dataType="number"
            onInput={inputHandler}
            initialValid={formState.inputs.drawdown.valid}
            initialValue={drawDownAmount}
            validators={[]}
            darkInputLighter
            reset={resetTriggered}
            resetFalse={() => setResetTriggered(false)}
          />
        </div>
        <div>
          <ButtonStyled type="submit" onClick={updateCalculations}>
            Update
          </ButtonStyled>
          <ButtonStyled onClick={resetCalculations}>Reset</ButtonStyled>
        </div>
      </StyledInputContainer>

      <StyledTable fullscreen>
        {/* <caption>Projection</caption> */}

        <thead>
          <tr>
            {width >= 768 && <th>Year</th>}
            <th>Age</th>
            <th>Total</th>
            <th>3%</th>
            <th>5%</th>
            <th>7%</th>
            {width >= 768 && <th>10%</th>}
            <th>Monthly</th>
          </tr>
        </thead>
        <tbody>
          {data.map((year, index) => {
            const targetYearHit =
              year.age === parseFloat(formState.inputs.retirementAge.value);

            return (
              <tr
                key={`table-number: ${index}`}
                className={targetYearHit ? "target-year-hit" : ""}
              >
                {width >= 768 && (
                  <CustomTD
                    number={year.year}
                    noFormat
                    targetYearHit={targetYearHit}
                  />
                )}
                <CustomTD
                  number={year.age}
                  noFormat
                  targetYearHit={targetYearHit}
                />
                <CustomTD
                  number={year.total}
                  targetYearHit={targetYearHit}
                  currency={"??"}
                />

                <CustomTD
                  number={year.three}
                  targetYearHit={targetYearHit}
                  currency={"??"}
                />

                <CustomTD
                  number={year.five}
                  targetYearHit={targetYearHit}
                  currency={"??"}
                />

                <CustomTD
                  number={year.seven}
                  targetYearHit={targetYearHit}
                  currency={"??"}
                />

                {width >= 768 && (
                  <CustomTD
                    number={year.ten}
                    targetYearHit={targetYearHit}
                    currency={"??"}
                  />
                )}

                {year.monthlyAdd > 0 && (
                  <CustomTD
                    number={year.monthlyAdd}
                    targetYearHit={targetYearHit}
                    currency={"??"}
                  />
                )}

                {year.drawDownMonthly && (
                  <CustomTD
                    number={year.drawDownMonthly}
                    targetYearHit={targetYearHit}
                    currency={"??"}
                    drawDown
                  />
                )}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      {/* <div style={{ marginBottom: "20vh" }}></div> */}
    </>
  );
};

export default Calculations;
