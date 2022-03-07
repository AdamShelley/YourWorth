import React, { useState, useContext } from "react";
import styled from "styled-components";
// import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { AuthenticationContext } from "../context/authenticate-context";
import Input from "../components/Input";
import { useForm } from "../hooks/form-hook";
import { useFetchHook } from "../hooks/fetch-hook";
import { requiredValidator } from "../helpers/validators";

import { ReactComponent as Launch } from "../images/launch.svg";

const SetupCard = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 2px;
  /* min-width: 35rem; */
  min-height: 100vh;
  /* margin: 1rem; */
  /* background-color: var(--cards); */
  /* box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5); */
  /* border: 1px solid var(--slate-gray); */
  font-family: "Open Sans", serif;

  svg {
    max-height: 45vh;
    max-width: 40%;
    padding: 1rem;
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
      background-color: var(--cadet-blue-crayola);
      border: 1px solid var(--cadet-blue-crayola);
    }
    .completed-page {
      background-color: var(--cultured);
      border: 1px solid var(--cultured);
    }
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: flex-start;

    svg {
      max-height: 30vh;
      max-width: 75%;
    }

    div {
      /* width: 100%; */
    }

    section {
      justify-content: flex-start !important;
      /* min-height: 40rem !important; */
      width: 70vw !important;
    }
  }

  @media screen and (max-width: 600px) {
    div {
      min-height: 0;

      section {
        justify-content: flex-start !important;
        /* min-height: 40rem !important; */
        width: 80vw !important;

        p {
          width: 100%;
        }

        > div {
          flex-direction: column;
        }

        ul {
          width: 100%;
        }
      }
    }
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40rem;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50vw;
    /* min-height: 60vh; */

    h2 {
      font-size: 2rem;
      font-weight: 300;
      letter-spacing: 1px;
    }

    h4 {
      font-weight: 400;
    }

    p {
      margin-top: 2rem;
      font-size: 1rem;
      font-weight: 400;
      width: 60%;
      line-height: 1.6;
      text-align: justify;
      text-justify: auto;
      /* margin-bottom: 2rem; */
    }

    > div {
      margin-top: 2rem;
      width: 80%;
      display: flex;
      align-items: space-evenly;

      > div {
        margin-right: 1rem;
        display: flex;
        justify-content: space-between;

        label {
          margin-top: 0.5rem;
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--gainsboro);
        }

        input {
          margin-top: 0.5rem;
          font-size: 1.1rem;
          padding: 0.6rem 1rem !important;
          width: 100%;
          color: var(--cultured);
          font-weight: 400;
          border-radius: 3px;

          /* max-width: 10rem; */
        }
      }
    }

    > div:nth-child(3) {
      margin-top: 0;
      justify-content: space-evenly;
    }

    > div:last-child {
      width: 50%;
    }
  }

  @media screen and (max-width: 1300px) {
    section div div {
      /* min-height: 5rem; */
    }

    se ction {
      div {
        label {
          font-size: 0.8rem !important;
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    section h2,
    p {
      /* align-self: flex-start; */
    }

    section div div {
      min-height: 5rem;
      display: flex;
      justify-content: space-between;
    }

    section div label {
      font-size: 1rem !important;
    }
  }
`;

const ButtonContainer = styled.div`
  margin-top: 3rem !important;
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
    border-radius: 3px;

    &:disabled {
      background-color: transparent;
      cursor: not-allowed;
      color: var(--slate-gray);
      border: 1px solid var(--slate-gray);

      &:hover {
        border: 1px solid var(--slate-gray);
      }
    }

    &:hover {
      border: 1px solid var(--cultured-2);
    }
  }

  @media screen and (max-width: 600px) {
    width: 100% !important;
    flex-direction: row !important;
    align-items: space-evenly;
    justify-content: space-evenly;
    padding: 0.5rem;
  }
`;

const FinalSubmitStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    text-align: center !important;
    font-weight: 400 !important;
  }

  ul {
    list-style: none;
    width: 50%;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      p {
        font-weight: 800;
        width: auto;
        margin-top: 0.8rem;

        span {
          color: gold;
        }
      }

      p:last-child {
        font-weight: 400;
        color: #09f378;
      }
    }
  }
`;

const FirstTimeSetUp = () => {
  const pages = 3;
  const history = useHistory();
  const auth = useContext(AuthenticationContext);
  const [section, setSection] = useState(1);
  const { sendRequest } = useFetchHook();
  const [formState, inputHandler] = useForm(
    {
      // netWorth: {
      //   value: "",
      //   valid: false,
      // },
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
      monthlyIncrease: {
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
          userId: auth.userId,
          // netWorth: formState.inputs.netWorth.value,
          targetWorth: formState.inputs.targetWorth.value,
          currentAge: formState.inputs.currentAge.value,
          targetAge: formState.inputs.targetAge.value,
          drawDownAmount: formState.inputs.drawDownAmount.value,
          monthlyIncrease: formState.inputs.monthlyIncrease.value,
          firstTimeUser: false,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      // First time user set to false to allow redirect to homepage
      let storage = JSON.parse(localStorage.getItem("userData"));
      storage["firstTimeUser"] = false;
      localStorage.setItem("userData", JSON.stringify(storage));

      history.go("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SetupCard>
      <Launch />
      <SectionContainer>
        {section === 1 && (
          <section>
            <h2> Welcome to YourWorth. </h2>
            <p>We need to take a few details to get started.</p>
            <p>
              This will be used to calculate your projections. (You can always
              change these later.)
            </p>

            <ButtonContainer>
              <button onClick={() => setSection(2)}>Next</button>
            </ButtonContainer>
          </section>
        )}
        {section === 2 && (
          <section>
            <h4>Please provide the following information.</h4>
            <div>
              {/* <Input
                id="netWorth"
                label="What is your current Net Worth?"
                dataType="number"
                // errorText={"Please enter your net worth."}
                validators={[requiredValidator()]}
                onInput={inputHandler}
                initialValue={formState.inputs.netWorth.value}
                initialValid={formState.inputs.netWorth.valid}
                darkInput
              /> */}
              <Input
                id="targetWorth"
                label="What is your target Net Worth?"
                dataType="number"
                // errorText={"Please enter your target goal."}
                validators={[requiredValidator()]}
                onInput={inputHandler}
                initialValue={formState.inputs.targetWorth.value}
                initialValid={formState.inputs.targetWorth.valid}
                darkInput
              />
              <Input
                id="monthlyIncrease"
                label="What will you add every month?"
                dataType="number"
                // errorText={"Please enter a draw down amount."}
                validators={[requiredValidator()]}
                onInput={inputHandler}
                initialValue={formState.inputs.monthlyIncrease.value}
                initialValid={formState.inputs.monthlyIncrease.valid}
                darkInput
              />
            </div>
            <div>
              <Input
                id="targetAge"
                label="What is your target age of retirement?"
                dataType="number"
                // errorText={"Please enter your target age to retire."}
                validators={[requiredValidator()]}
                onInput={inputHandler}
                initialValue={formState.inputs.targetAge.value}
                initialValid={formState.inputs.targetAge.valid}
                darkInput
              />
              <Input
                id="currentAge"
                label="What is your current age?"
                dataType="number"
                // errorText={"Please enter your current age."}
                validators={[requiredValidator()]}
                onInput={inputHandler}
                initialValue={formState.inputs.currentAge.value}
                initialValid={formState.inputs.currentAge.valid}
                darkInput
              />
              <Input
                id="drawDownAmount"
                label="What will you drawdown?"
                dataType="number"
                // errorText={"Please enter a draw down amount."}
                validators={[requiredValidator()]}
                onInput={inputHandler}
                initialValue={formState.inputs.drawDownAmount.value}
                initialValid={formState.inputs.drawDownAmount.valid}
                darkInput
              />
            </div>
            <ButtonContainer>
              <button onClick={() => setSection(1)}> Back</button>
              <button onClick={() => setSection(3)}>Next</button>
            </ButtonContainer>
          </section>
        )}
        {section === 3 && (
          <FinalSubmitStyle>
            <h2>Confirm your details</h2>

            <ul>
              {/* <li>
                <p>Current Net Worth</p>
                <p>
                  {formState.inputs.netWorth.value ? (
                    formState.inputs.netWorth.value
                  ) : (
                    <span>Missing</span>
                  )}
                </p>
              </li> */}
              <li>
                <p>Target Net Worth</p>
                <p>
                  {formState.inputs.targetWorth.value ? (
                    formState.inputs.targetWorth.value
                  ) : (
                    <span>Missing</span>
                  )}
                </p>
              </li>
              <li>
                <p>Target age to retire</p>
                <p>
                  {formState.inputs.targetAge.value ? (
                    formState.inputs.targetAge.value
                  ) : (
                    <span>Missing</span>
                  )}
                </p>
              </li>
              <li>
                <p>Current Age</p>
                <p>
                  {formState.inputs.currentAge.value ? (
                    formState.inputs.currentAge.value
                  ) : (
                    <span>Missing</span>
                  )}
                </p>
              </li>
              <li>
                <p>Monthly Increase</p>
                <p>
                  {formState.inputs.monthlyIncrease.value ? (
                    formState.inputs.monthlyIncrease.value
                  ) : (
                    <span>Missing</span>
                  )}
                </p>
              </li>
              <li>
                <p>Draw down amount</p>
                <p>
                  {formState.inputs.drawDownAmount.value ? (
                    formState.inputs.drawDownAmount.value
                  ) : (
                    <span>Missing</span>
                  )}
                </p>
              </li>
            </ul>

            <ButtonContainer>
              <button onClick={() => setSection(2)}>Go Back</button>
              <button onClick={submitSetup} disabled={!formState.formValid}>
                Confirm
              </button>
            </ButtonContainer>
            {!formState.formValid && (
              <p>Please complete the information above.</p>
            )}
          </FinalSubmitStyle>
        )}

        <div className="circle-container">
          {[...Array(pages)].map((p, index) => (
            <div
              key={"page" + index}
              className={`page-circle ${
                index + 1 === section ? "current-page" : ""
              } ${index + 1 < section ? "completed-page" : ""}`}
            ></div>
          ))}
        </div>
      </SectionContainer>
    </SetupCard>
  );
};

export default FirstTimeSetUp;
