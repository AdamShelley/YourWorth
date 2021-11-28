import React from "react";
import styled from "styled-components";
import Input from "../components/Input";

import { useForm } from "../hooks/form-hook";

const AccountPageStyles = styled.div`
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  margin-top: 4rem;
  min-height: 100vh;

  h2 {
  }

  > div {
    width: 60%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }

  > div > div {
    border-top: 1px solid var(--cards);
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
  }

  .settings-section {
    margin-top: 1rem;
    padding: 2rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    h4 {
      margin-top: 2rem;
      width: 100%;
    }

    div {
      width: 100%;
    }

    .settings-control {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;

      select,
      button {
        padding: 1rem;
        margin: 0.5rem;
        width: 50%;
        background-color: var(--cultured);
        border: none;
        border-radius: 2px;
        text-align: center;
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--gunmetal);
        cursor: pointer;
      }
    }
  }
`;

const AccountPage = () => {
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        valid: false,
      },
      age: {
        value: "",
        valid: false,
      },
      targetAge: {
        value: "",
        valid: false,
      },
      targetNetWorth: {
        value: "",
        valid: false,
      },
    },
    false
  );

  return (
    <AccountPageStyles>
      <div>
        <div className="settings-section">
          <h4>Account Details</h4>
          <div>
            <Input label="Name" validators={[]} onInput={inputHandler} />
            <Input label="Age" validators={[]} onInput={inputHandler} />
          </div>
        </div>

        <div className="settings-section">
          <h4>Finance Goals</h4>
          <div>
            <Input
              label="Target Retirement Age"
              validators={[]}
              onInput={inputHandler}
            />
            <Input
              label="Target Retirement Goal"
              validators={[]}
              onInput={inputHandler}
            />
          </div>
        </div>

        <div className="settings-section">
          <h4>Control Panel</h4>
          <div className="settings-control">
            <select name="currency" id="">
              <option value="" default selected>
                Change currency
              </option>
            </select>
            <button>Delete ALL Data</button>
            <button>Delete Account</button>
          </div>
        </div>
      </div>
    </AccountPageStyles>
  );
};

export default AccountPage;
