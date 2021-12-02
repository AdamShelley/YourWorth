import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import { useFetchHook } from "../hooks/fetch-hook";

import { useForm } from "../hooks/form-hook";

const AccountPageStyles = styled.div`
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  margin-top: 2rem;
  min-height: 100vh;
  font-family: "Opens Sans", serif;

  h1 {
    font-size: 1.2rem;
    font-weight: 500;
    letter-spacing: 1px;
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
    padding: 2rem 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    h4 {
      width: 100%;
      font-size: 1.1rem;
      font-weight: 100;
      letter-spacing: 0.5px;
      line-height: 1.8;
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
        height: 4rem;
        background-color: var(--cards);
        border: 1px solid var(--card-header);
        box-shadow: 0 1px 2px rgba(255, 255, 255, 0.25);
        color: var(--cultured-2);
        border-radius: 2px;
        text-align: center;
        font-size: 1rem;
        font-family: inherit;
        font-weight: 500;
        letter-spacing: 0.5px;
        line-height: 1.8;
        cursor: pointer;
        transition: all 0.2s ease-out;

        &:hover {
          border: 1px solid var(--cultured-2);
        }
      }
    }
  }
`;

const AccountPage = ({ userId }) => {
  const [loadedUser, setLoadedUser] = useState();
  const { sendRequest, error, loading, clearError } = useFetchHook();

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userId}`,
          "GET"
        );

        console.log(responseData.user);
        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchUser();
  }, [setLoadedUser, sendRequest, userId]);

  return (
    <AccountPageStyles>
      {loadedUser && (
        <div>
          <h1>Settings</h1>
          <div className="settings-section">
            <h4>Account</h4>
            <div>
              <Input
                label="Name"
                validators={[]}
                onInput={inputHandler}
                initialValue={loadedUser.name}
                darkInput
              />

              <Input
                label="Age"
                validators={[]}
                onInput={inputHandler}
                initialValue={loadedUser.age}
                darkInput
              />
            </div>
          </div>

          <div className="settings-section">
            <h4>Finance Goals</h4>
            <div>
              <Input
                label="Target Retirement Age"
                validators={[]}
                onInput={inputHandler}
                initialValue={loadedUser.ageToRetire}
                darkInput
              />
              <Input
                label="Target Retirement Goal"
                validators={[]}
                onInput={inputHandler}
                initialValue={loadedUser.targetWorth}
                darkInput
              />
              <Input
                label="Drawdown (per month)"
                validators={[]}
                onInput={inputHandler}
                initialValue={loadedUser.drawDownAmount}
                darkInput
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
      )}
    </AccountPageStyles>
  );
};

export default AccountPage;
