import React, { useState } from "react";
import styled from "styled-components";
// import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";

import Input from "../components/Input";
import { useForm } from "../hooks/form-hook";
import { useFetchHook } from "../hooks/fetch-hook";
import { requiredValidator } from "../helpers/validators";

const SetupCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 2px;
  min-width: 35rem;
  min-height: 30rem;
  margin: 2rem;
  /* background-color: var(--cards); */
  /* box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5); */
  /* border: 1px solid var(--slate-gray); */
  font-family: "Open Sans", serif;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 60%;
    height: 70vh;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 300;
  }

  p {
    margin-top: 1rem;
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  label {
    margin-top: 0.5rem;
  }

  input {
    margin-top: 0.5rem;
    padding: 0.3rem 0.5rem;
  }

  p {
    color: var(--light-gray);
  }

  .circle-container {
    display: flex;
    margin-top: 2rem;

    .page-circle {
      width: 10px;
      height: 10px;
      border: 1px solid white;
      margin: 0.5rem;
      border-radius: 50%;
    }
    .current-page {
      background-color: red;
    }
    .completed-page {
      background-color: green;
    }
  }
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;

  button {
    /* align-self: flex-end; */

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--cards);
    padding: 1rem 2rem;
    border: 1px solid var(--card-header);
    color: var(--cultured);
    cursor: pointer;
    letter-spacing: 1px;

    &:hover {
      border: 1px solid var(--cultured-2);
    }
  }
`;

const FirstTimeSetUp = ({ loadedUser }) => {
  const pages = 3;
  const history = useHistory();
  const [section, setSection] = useState(1);
  const { sendRequest } = useFetchHook();
  const [formState, inputHandler] = useForm(
    {
      netWorth: {
        value: "",
        valid: false,
      },
      targetWorth: { value: "", valid: false },
      targetAge: { value: "", valid: false },
      currentAge: {
        value: "",
        valid: false,
      },
      drawDownAmount: {
        value: "",
        valid: false,
      },
    },
    false
  );

  const submitSetup = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/users/update`,
        "PATCH",
        JSON.stringify({
          userId: loadedUser._id,
          netWorth: formState.inputs.netWorth.value,
          targetWorth: formState.inputs.targetWorth.value,
          currentAge: formState.inputs.currentAge.value,
          targetAge: formState.inputs.targetAge.value,
          drawDownAmount: formState.inputs.drawDownAmount.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(formState.isValid);

  return (
    <SetupCard>
      {section === 1 && (
        <section>
          <h2> Welcome to YourWorth. </h2>
          <p>Please provide a few details to get started.</p>
          {/* <p>Please input some details about your worth & goals</p> */}
          <Input
            id="netWorth"
            label="Net Worth"
            dataType="number"
            errorText={"Please enter a value."}
            validators={[requiredValidator()]}
            onInput={inputHandler}
            initialValue={formState.inputs.netWorth.value}
            initialValid={formState.inputs.netWorth.valid}
            darkInput
          />
          <Input
            id="targetWorth"
            label="Target Net Worth"
            dataType="number"
            errorText={"Please enter a value."}
            validators={[requiredValidator()]}
            onInput={inputHandler}
            initialValue={formState.inputs.targetWorth.value}
            initialValid={formState.inputs.targetWorth.valid}
            darkInput
          />
          <Input
            id="targetAge"
            label="Target Age"
            dataType="number"
            errorText={"Please enter a value."}
            validators={[requiredValidator()]}
            onInput={inputHandler}
            initialValue={formState.inputs.targetAge.value}
            initialValid={formState.inputs.targetAge.valid}
            darkInput
          />
          <ButtonContainer>
            <button onClick={() => setSection(2)}>Next</button>
          </ButtonContainer>
        </section>
      )}
      {section === 2 && (
        <section>
          <p>Continue to input your information.</p>
          <Input
            id="currentAge"
            label="Current Age"
            dataType="number"
            errorText={"Please enter a value."}
            validators={[]}
            onInput={inputHandler}
            initialValue={formState.inputs.currentAge.value}
            initialValid={formState.inputs.currentAge.valid}
          />
          <Input
            id="drawDownAmount"
            label="Drawdown Amount"
            dataType="number"
            errorText={"Please enter a value."}
            validators={[]}
            onInput={inputHandler}
            initialValue={formState.inputs.drawDownAmount.value}
            initialValid={formState.inputs.drawDownAmount.valid}
          />
          <ButtonContainer>
            <button onClick={() => setSection(1)}> Back</button>
            <button onClick={() => setSection(3)}>Next</button>
          </ButtonContainer>
        </section>
      )}
      {section === 3 && (
        <section>
          <h2>Confirm your details</h2>
          <p>Current Net Worth: {formState.inputs.netWorth.value}</p>
          <p>Target Net Worth: {formState.inputs.targetWorth.value}</p>
          <p>Target age to retire: {formState.inputs.targetAge.value}</p>
          <p>Current Age: {formState.inputs.currentAge.value}</p>
          <p>Draw down amount: {formState.inputs.drawDownAmount.value}</p>
          <ButtonContainer>
            <button onClick={() => setSection(2)}>Go Back</button>
            <button onClick={submitSetup} disabled={!formState.formValid}>
              Submit
            </button>
          </ButtonContainer>
        </section>
      )}
      <div className="circle-container">
        {[...Array(pages)].map((p, index) => (
          <div
            className={`page-circle ${
              index + 1 === section ? "current-page" : ""
            } ${index + 1 < section ? "completed-page" : ""}`}
          ></div>
        ))}
      </div>
      {/* <p>Page {section} of 3</p> */}
    </SetupCard>
  );
};

export default FirstTimeSetUp;
