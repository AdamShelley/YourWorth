import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import { useFetchHook } from "../hooks/fetch-hook";

import { useForm } from "../hooks/form-hook";
import { AuthenticationContext } from "../context/authenticate-context";
import Loader from "react-loader-spinner";

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

    & button,
    select {
      padding: 1rem 2rem;
      background-color: var(--cards);
      border: 1px solid var(--card-header);
      color: var(--cultured-2);
      letter-spacing: 1px;
      align-self: flex-end;
    }
  }

  form {
    display: flex;
    flex-direction: column;
  }

  form > button {
    cursor: pointer;
    transition: all 0.2s ease-out;

    &:hover {
      border: 1px solid var(--cultured-2);
    }
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
    border-top: 1px solid var(--card-header);
    min-height: 100%;

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

    div:first-child {
      margin-top: 0;
    }

    .settings-control {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;

      div {
        min-height: 100%;
      }

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
  const auth = useContext(AuthenticationContext);
  const [loadedUser, setLoadedUser] = useState();
  const { sendRequest, loading } = useFetchHook();

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
      targetNetworth: {
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

  // Update user details via update button
  const submitUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/users/update`,
        "PATCH",
        JSON.stringify({
          userId: auth.userId,
          name: formState.inputs.name.value,
          currentAge: formState.inputs.age.value,
          targetAge: formState.inputs.targetAge.value,
          targetWorth: formState.inputs.targetNetworth.value,
          drawDownAmount: formState.inputs.drawdown.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      setLoadedUser(response.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AccountPageStyles>
      {loadedUser && (
        <div>
          <h1>Settings</h1>
          <form onSubmit={submitUpdate}>
            <div className="settings-section">
              <h4>Account</h4>
              {!loading ? (
                <div>
                  <Input
                    id="name"
                    label="Name"
                    validators={[]}
                    onInput={inputHandler}
                    initialValue={loadedUser.name}
                    initialValid={true}
                    placeholder={"Add a name here"}
                    disabled={loading}
                    darkInput
                  />

                  <Input
                    id="age"
                    label="Age"
                    validators={[]}
                    onInput={inputHandler}
                    initialValue={loadedUser.age}
                    initialValid={true}
                    disabled={loading}
                    darkInput
                  />
                </div>
              ) : (
                <Loader
                  type="ThreeDots"
                  color="var(--cultured-2)"
                  height={"100%"}
                  width={"30%"}
                />
              )}
            </div>

            <div className="settings-section">
              <h4>Finance Goals</h4>
              {!loading ? (
                <div>
                  <Input
                    id="targetAge"
                    label="Target Retirement Age"
                    validators={[]}
                    onInput={inputHandler}
                    initialValue={loadedUser.ageToRetire}
                    initialValid={true}
                    disabled={loading}
                    darkInput
                  />
                  <Input
                    id="targetNetworth"
                    label="Target Retirement Goal"
                    validators={[]}
                    onInput={inputHandler}
                    initialValue={loadedUser.targetWorth}
                    initialValid={true}
                    disabled={loading}
                    darkInput
                  />
                  <Input
                    id="drawdown"
                    label="Drawdown (per month)"
                    validators={[]}
                    onInput={inputHandler}
                    initialValue={loadedUser.drawDownAmount}
                    initialValid={true}
                    disabled={loading}
                    darkInput
                  />
                </div>
              ) : (
                <Loader
                  type="ThreeDots"
                  color="var(--cultured-2)"
                  height={"100%"}
                  width={"30%"}
                />
              )}
            </div>
            <button type="submit" onClick={submitUpdate}>
              {loading ? "Updating" : "Update"}
            </button>
          </form>
          <div className="settings-section">
            <h4>Control Panel</h4>
            <div className="settings-control">
              <select name="currency" id="">
                <option value="">Change currency</option>
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
