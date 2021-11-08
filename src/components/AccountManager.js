import React, { useState, useContext } from "react";
import Accounts from "./Accounts";
import styled from "styled-components";
import Modal from "./Modal";
import Input from "./Input";
import Loader from "react-loader-spinner";
import { useForm } from "../hooks/form-hook";
import { useFetchHook } from "../hooks/fetch-hook";
import { AuthenticationContext } from "../context/authenticate-context";
import { requiredValidator } from "../helpers/validators";

const AccountUpdateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  button {
    margin: 1rem;

    padding: 0.7rem 1.2rem;
    text-align: center;
    border: 1px solid transparent;
    background-color: var(--cultured);
    color: var(--cultured);
    border-radius: 1px;
    cursor: pointer;
    width: 1rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: var(--davys-grey);
    box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.2);

    transition: all 0.2s ease-in-out;
    transition-delay: 0.1s;
    max-height: 2rem;

    span {
      text-align: center;
      color: var(--cultured);
      opacity: 0;
      overflow: hidden;
      transition-delay: 0.2s;
      visibility: hidden;
    }

    &:hover {
      width: 10%;
      overflow: hidden;

      background-color: var(--davys-grey);
      box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.2);
      color: var(--cultured);
      transition: all 0.2s ease-in-out;

      span {
        opacity: 1;
        visibility: visible;
      }

      i {
        margin-right: 0.5rem;
      }
    }
  }
`;

const AccountManager = ({ accounts, updateLoadedUser, updateNetWorth }) => {
  const [modal, setModal] = useState(false);
  const [loadedAccounts, setLoadedAccounts] = useState(accounts);
  const { sendRequest, error, loading } = useFetchHook();
  const auth = useContext(AuthenticationContext);

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        valid: false,
      },
      category: {
        value: "",
        valid: false,
      },
      balance: {
        value: "",
        valid: false,
      },
    },
    false
  );

  const addAccountHandler = () => setModal(true);
  const closeModal = () => setModal((prev) => !prev);

  const submitAccount = async (e) => {
    e.preventDefault();
    const account = {
      name: formState.inputs.name.value,
      category: formState.inputs.category.value,
      balance: parseFloat(formState.inputs.balance.value),
      user: auth.userId,
    };

    try {
      await sendRequest(
        `http://localhost:8080/accounts`,
        "POST",
        JSON.stringify(account),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      closeModal();
      setLoadedAccounts([...loadedAccounts, account]);
      updateNetWorth([...loadedAccounts, account]);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteHandler = (deletedAccId) => {
    setLoadedAccounts((accounts) =>
      accounts.filter((acc) => acc._id !== deletedAccId)
    );

    updateLoadedUser(loadedAccounts, deletedAccId);
  };

  return (
    <div>
      {loadedAccounts.length > 0 && (
        <Accounts
          portfolioPage
          accounts={loadedAccounts}
          onDelete={onDeleteHandler}
        />
      )}
      <AccountUpdateContainer>
        <button onClick={addAccountHandler}>
          <i className="fas fa-plus"></i> <span>Add Account</span>
        </button>
      </AccountUpdateContainer>
      <Modal
        show={modal}
        title="Add a new account to the Portfolio"
        close={closeModal}
        submitHandler={submitAccount}
      >
        <div>
          <Input
            id="name"
            label="Account name"
            dataType="text"
            errorText={"Please enter an account name"}
            onInput={inputHandler}
            validators={[requiredValidator()]}
          />
          <Input
            id="category"
            label="Account type"
            dataType="text"
            errorText={"Please enter a category"}
            onInput={inputHandler}
            validators={[requiredValidator()]}
          />
          <Input
            id="balance"
            label="Account balance"
            dataType="number"
            errorText={"Please enter a balance"}
            onInput={inputHandler}
            validators={[requiredValidator()]}
          />
        </div>
        {loading && (
          <Loader type="Rings" color="#00BFFF" height={80} width={80} />
        )}
      </Modal>
    </div>
  );
};

export default AccountManager;
