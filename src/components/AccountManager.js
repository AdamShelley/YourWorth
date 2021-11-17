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
import { StyledModalTable } from "../styles/tables";

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
    background-color: var(--card-header);
    box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.2);

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

      background-color: var(--card-header);
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
  const [advanceModal, setAdvanceModal] = useState(false);
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
      const response = await sendRequest(
        `http://localhost:8080/accounts`,
        "POST",
        JSON.stringify(account),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      closeModal();
      setLoadedAccounts([...loadedAccounts, response.user]);
      updateNetWorth([...loadedAccounts, response.user]);
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

  const advanceAllHandler = () => {
    setAdvanceModal(true);

    setFormData(
      {
        ...formState.inputs,
        name: undefined,
        category: undefined,
      },
      false
    );
  };

  const submitNewSnapshot = async () => {
    // Save snapshots of the current accounts

    console.log(formState.inputs);

    const newAccountBalance = loadedAccounts.map((acc) => {
      let newBalance;
      if (formState.inputs[acc.name].value === "") {
        newBalance = acc.balance;
      } else {
        newBalance = formState.inputs[acc.name].value;
      }

      return (acc = {
        ...acc,
        balance: parseFloat(newBalance),
      });
    });

    try {
      await sendRequest(
        `http://localhost:8080/accounts/log`,
        "PATCH",
        JSON.stringify({
          snapshot: loadedAccounts,
          newData: newAccountBalance,
          userId: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      setAdvanceModal(false);
    } catch (err) {
      console.log(err);
    }
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
        <button onClick={advanceAllHandler}>
          <i className="fas fa-arrow-right"></i> <span>Update all</span>
        </button>
      </AccountUpdateContainer>
      <Modal
        show={modal}
        title="Add a new account to the Portfolio"
        close={closeModal}
        submitHandler={submitAccount}
        modalSize="medium"
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
            dropDown
            id="category"
            label="Category"
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
      <Modal
        show={advanceModal}
        title="Update all values for the database"
        close={() => setAdvanceModal(false)}
        submitHandler={submitNewSnapshot}
        modalSize="large"
      >
        <StyledModalTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Before</th>
              <th>After</th>
            </tr>
          </thead>
          <tbody>
            {/* The before updating */}

            {loadedAccounts.map((acc) => (
              <>
                <tr key={acc._id}>
                  <td>{acc.name}</td>
                  <td>£ {acc.balance.toFixed(2)}</td>
                  <td>
                    <Input
                      updateAllModal
                      id={acc.name}
                      label={""}
                      dataType="number"
                      onInput={inputHandler}
                      validators={[]}
                      minimalInput
                    />
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </StyledModalTable>
      </Modal>
    </div>
  );
};

export default AccountManager;
