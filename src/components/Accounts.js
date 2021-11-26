import React, { useState, useContext } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";

import Modal from "./Modal";
import { useFetchHook } from "../hooks/fetch-hook";
import { StyledTable, StyledModalTable } from "../styles/tables";
import { commaValue } from "../helpers/commaValue";
import { types } from "../helpers/accountTypes.js";
import { useForm } from "../hooks/form-hook";
import { AuthenticationContext } from "../context/authenticate-context";

import Input from "./Input";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  h3 {
    display: flex;
    justify-content: space-between;
    align-items: space-between;
    width: 100%;
    margin-top: 1rem;

    span {
      padding: 0.5rem 0.4rem;
      font-weight: 100;
    }

    select,
    textarea {
      width: 50%;
      padding: 0.5rem 0.4rem;
      resize: none;
      border: 1px solid var(--slate-gray);
      border-radius: 2px;
      color: var(--charleston-green);
      font-weight: 400;
    }
  }
`;

let confirmTimer;

const Accounts = ({ accounts, portfolioPage, onDelete }) => {
  const auth = useContext(AuthenticationContext);
  const [modal, setModal] = useState(false);
  const [accountSelected, setAccountSelected] = useState();
  const [confirmSubmission, setConfirmSubmission] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState();
  const { sendRequest, error, loading, clearError } = useFetchHook();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        valid: true,
      },
      category: {
        value: "",
        valid: true,
      },
      balance: {
        value: "",
        valid: true,
      },
    },
    true
  );

  const Toggle = () => setModal(!modal);

  const confirmSub = () => {
    setModal(false);
    setConfirmSubmission(true);
  };

  const submitUpdate = async () => {
    try {
      await sendRequest(
        `http://localhost:8080/accounts/${accountSelected._id}`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          category: formState.inputs.category.value,
          balance: formState.inputs.balance.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {
      console.log(err);
    }

    setConfirmSubmission(false);
  };

  // Toggle the modal and store selected account
  const editAccount = (acc) => {
    Toggle();
    setAccountSelected(acc);
  };

  // Delete the account (TODO Later)
  const startDeletion = (index) => {
    clearTimeout(confirmTimer);
    setDeleteIndex(index);
    setConfirmDeletion(true);

    confirmTimer = setTimeout(() => {
      setConfirmDeletion(false);
      setDeleteIndex(null);
    }, 3000);
  };

  const confirmDeleteAccount = async (account) => {
    setDeleteIndex(null);
    setConfirmDeletion(false);

    // Send request to backend to delete the account
    try {
      await sendRequest(
        `http://localhost:8080/accounts/${account._id}`,
        "DELETE",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      onDelete(account._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledTable tlayout>
      {/* <caption>Accounts</caption> */}
      <thead>
        <tr>
          <th>Account</th>
          <th>Type</th>
          <th style={{ textAlign: "right" }}>Amount</th>
          {portfolioPage && <th></th>}
        </tr>
      </thead>
      <tbody>
        {accounts.map((account, index) => {
          const number = account.balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          });

          return (
            <tr key={`row-${index}`}>
              <td>{account.name}</td>
              <td>{account.category}</td>
              <td style={{ textAlign: "right" }}>£{number}</td>
              {portfolioPage && (
                <>
                  <td className="box-buttons">
                    {index !== deleteIndex && (
                      <>
                        <div
                          className="box edit-box"
                          onClick={() => editAccount(account)}
                        >
                          Edit
                        </div>

                        <div
                          className="box delete-box"
                          onClick={() => startDeletion(index)}
                        >
                          Delete
                        </div>
                      </>
                    )}
                    {confirmDeletion && index === deleteIndex && (
                      <button
                        href="/"
                        className="box delete-account-btn"
                        onClick={() => confirmDeleteAccount(account)}
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                  {loading && confirmDeletion && index === deleteIndex && (
                    <Loader
                      type="Rings"
                      color="#00BFFF"
                      height={25}
                      width={25}
                    />
                  )}
                </>
              )}
            </tr>
          );
        })}
      </tbody>
      {/* Modal for Edit */}

      {accountSelected && (
        <Modal
          show={modal}
          close={Toggle}
          title={"Update account details"}
          submitHandler={confirmSub}
          modalSize="medium"
        >
          <ModalContent>
            <Input
              id="name"
              label="Account Name"
              dataType="text"
              errorText={"Enter a value more than 6 characters long"}
              validators={[]}
              onInput={inputHandler}
              initialValid={formState.inputs.name.valid}
              initialValue={accountSelected.name}
            />
            <Input
              dropDown
              id="category"
              label="Category"
              errorText={"Please enter a category"}
              onInput={inputHandler}
              validators={[]}
              initialValue={accountSelected.category}
            />

            <Input
              id="balance"
              label="Balance"
              dataType="number"
              errorText={"Enter a value more than 6 characters long"}
              validators={[]}
              onInput={inputHandler}
              initialValid={formState.inputs.balance.valid}
              initialValue={accountSelected.balance}
            />
          </ModalContent>
        </Modal>
      )}
      {/* Modal for Delete  */}
      {/* Are you sure modal */}

      {confirmSubmission && (
        <Modal
          show={confirmSubmission}
          close={() => setConfirmSubmission(false)}
          title={"You are about to make the following changes: "}
          submitHandler={submitUpdate}
          modalSize="large"
        >
          <StyledModalTable>
            <thead>
              <tr>
                <th></th>
                <th>Before</th>
                <th>After</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{accountSelected.name}</td>
                <td>{formState.inputs.name.value}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{accountSelected.category}</td>
                <td>{formState.inputs.category.value}</td>
              </tr>
              <tr>
                <td>Balance</td>
                <td>{accountSelected.balance}</td>
                <td>{formState.inputs.balance.value}</td>
              </tr>
            </tbody>
          </StyledModalTable>
        </Modal>
      )}
    </StyledTable>
  );
};

export default Accounts;
