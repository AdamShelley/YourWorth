import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { ButtonStyled, SelectStyled } from "../styles/inputStyles";
import Input from "../components/Input";
import { useFetchHook } from "../hooks/fetch-hook";

import { useForm } from "../hooks/form-hook";
import { AuthenticationContext } from "../context/authenticate-context";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { currencies } from "../helpers/currencies";
import Modal from "../components/Modal";

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

    select {
      height: 4rem;
      display: flex;
    }

    form {
      display: flex;
      flex-direction: column;

      button {
        align-self: flex-end;
        width: 25%;
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
    }

    > div > div {
      /* border-top: 1px solid var(--cards); */
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
        width: 50%;
        font-size: 1.1rem;
        font-weight: 100;
        letter-spacing: 0.5px;
        line-height: 1.8;
      }

      div {
        width: 80%;
        min-height: 100;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        label {
          align-self: flex-start;
        }
      }

      div:first-child {
        margin-top: 0;
      }
    }

    .settings-control {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-evenly;
      width: 100%;

      div {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  @media screen and (max-width: 1440px) {
    .settings-control {
      select,
      button {
        width: 80% !important;
      }
    }
  }

  @media screen and (max-width: 1023px) {
    .account-page-container {
      width: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    .settings-section {
      margin-top: 4rem;
      display: flex;
      flex-direction: column;
      align-items: center !important;
      width: 100%;

      h4 {
        text-align: center;
        margin: 0.5rem;
        font-size: 1.2rem !important;
        color: var(--cultured-2);
      }

      > div {
        margin-top: 2rem;
        width: 70% !important;
        align-items: center !important;
      }
    }

    div > form > button {
      align-self: center !important;
    }
  }

  @media screen and (max-width: 425px) {
    margin-top: 0;
    padding: 1rem 0;

    form {
      margin-bottom: 3rem;
    }

    .settings-section {
      margin: 5rem 0;

      > div {
        width: 100% !important;
        display: flex;
      }

      h4 {
        text-align: center;
        font-size: 0.9rem;
        font-weight: 100;
      }
    }

    .settings-control {
      select {
        width: 80%;
      }
      button {
        width: 80%;
      }
    }
  }

  @media screen and (max-width: 375px) {
    .settings-control {
      select {
        width: 90%;
      }
      button {
        width: 90%;
      }
    }
  }
`;

const ModalCheckStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    font-size: 1rem !important;
    font-weight: 500 !important;
    color: var(--cadet-blue-crayola) !important;
  }
`;

const AccountPage = ({ userId }) => {
  const auth = useContext(AuthenticationContext);
  const [loadedUser, setLoadedUser] = useState();
  const { sendRequest, loading } = useFetchHook();
  const [checkModal, setCheckModal] = useState(false);
  const [checkDeleteModal, setCheckDeleteModal] = useState(false);

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

  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/users/${userId}`,
          "GET"
        );

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

  // Submit choice of currency to the backend
  const selectCurrency = async (currency) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/users/currency`,
        "PATCH",
        JSON.stringify({
          userId: auth.userId,
          currency: currency.split(":")[1],
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const resetAccountData = async () => {
    console.log("Reset account data");
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/users/d`,
        "PATCH",
        JSON.stringify({
          userId: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {
      console.log(err);
    }

    setCheckModal(false);
  };

  const deleteAccount = async () => {
    console.log("Delete account");

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/users/destroy`,
        "DELETE",
        JSON.stringify({
          userId: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      // Delete local storage data
      localStorage.removeItem("userData");

      history.go("/signup");
    } catch (err) {
      console.log(err);
    }

    setCheckDeleteModal(false);
  };

  return (
    <AccountPageStyles>
      {loadedUser && (
        <div className="account-page-container">
          <h1>Settings</h1>
          <form onSubmit={submitUpdate}>
            <div className="settings-section">
              <h4>Account</h4>
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
            </div>

            <div className="settings-section">
              <h4>Finance Goals</h4>

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
            </div>
            <button
              className="update-button"
              type="submit"
              onClick={submitUpdate}
            >
              {loading ? (
                <Loader
                  type="ThreeDots"
                  color="var(--cultured-2)"
                  height={"100%"}
                  width={"30%"}
                />
              ) : (
                "Update"
              )}
            </button>
          </form>
          <div className="settings-section">
            <h4>Control Panel</h4>
            <div className="settings-control">
              <SelectStyled
                className="select-currency"
                name="currency"
                id="select-currency"
                onChange={(e) => selectCurrency(e.target.value)}
              >
                <option value="">Change currency</option>
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </SelectStyled>

              <ButtonStyled onClick={() => setCheckModal(true)}>
                <h3>Reset data</h3>
                <p>
                  Delete all data for this account, including accounts and
                  previously saved snapshots
                </p>
              </ButtonStyled>

              <ButtonStyled onClick={() => setCheckDeleteModal(true)}>
                <h3>Delete Account</h3>
                <p> Completely delete all traces of your account </p>
              </ButtonStyled>
            </div>
          </div>
        </div>
      )}

      <Modal
        show={checkModal}
        title="Reset account"
        close={() => {
          setCheckModal(false);
        }}
        submitHandler={resetAccountData}
        modalSize="medium"
      >
        <ModalCheckStyles>
          <p>
            Warning: This will delete all the data in your account. This cannot
            be undone.
          </p>
        </ModalCheckStyles>
      </Modal>

      <Modal
        show={checkDeleteModal}
        title="Delete account"
        close={() => {
          setCheckDeleteModal(false);
        }}
        submitHandler={deleteAccount}
        modalSize="medium"
      >
        <ModalCheckStyles>
          <p>Warning: This will delete your account. This cannot be undone.</p>
        </ModalCheckStyles>
      </Modal>
    </AccountPageStyles>
  );
};

export default AccountPage;
