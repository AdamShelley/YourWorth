import React, { useState } from "react";
import styled from "styled-components";
// import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";

import Input from "../components/Input";
import { useForm } from "../hooks/form-hook";
import { useFetchHook } from "../hooks/fetch-hook";

const SetupCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 2px;
  min-width: 35rem;
  min-height: 30rem;

  background-color: var(--cards);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 1.2rem;
  }

  p {
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

  button {
    padding: 0.5rem 1rem;
    cursor: pointer;
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

  return (
    <SetupCard>
      {section === 1 && (
        <section>
          <h2> First Time USER. Please set up your account</h2>
          <p>Please input some details about your worth & goals</p>
          <Input
            id="netWorth"
            label="Net Worth"
            dataType="number"
            errorText={"Please enter a value."}
            validators={[]}
            onInput={inputHandler}
            initialValue={formState.inputs.netWorth.value}
            initialValid={formState.inputs.netWorth.valid}
          />
          <Input
            id="targetWorth"
            label="Target Net Worth"
            dataType="number"
            errorText={"Please enter a value."}
            validators={[]}
            onInput={inputHandler}
            initialValue={formState.inputs.targetWorth.value}
            initialValid={formState.inputs.targetWorth.valid}
          />
          <Input
            id="targetAge"
            label="Target Age"
            dataType="number"
            errorText={"Please enter a value."}
            validators={[]}
            onInput={inputHandler}
            initialValue={formState.inputs.targetAge.value}
            initialValid={formState.inputs.targetAge.valid}
          />
          <button onClick={() => setSection(2)}>Next -></button>
        </section>
      )}
      {section === 2 && (
        <section>
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
          <button onClick={() => setSection(1)}> Back</button>
          <button onClick={() => setSection(3)}>Next -></button>
        </section>
      )}
      {section === 3 && (
        <section>
          <h2>Confirm your details</h2>
          <p>{formState.inputs.netWorth.value}</p>
          <p>{formState.inputs.targetWorth.value}</p>
          <p>{formState.inputs.targetAge.value}</p>
          <p>{formState.inputs.currentAge.value}</p>
          <p>{formState.inputs.drawDownAmount.value}</p>

          <button onClick={() => setSection(2)}>Go Back</button>
          <button onClick={submitSetup}>Submit</button>
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
