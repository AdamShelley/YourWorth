import React, { useState, useContext } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import Modal from "./Modal";
import { useFetchHook } from "../hooks/fetch-hook";
import { StyledTable } from "../styles/tables";
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

  // Toggle the modal and store selected account
  const editAccount = (acc) => {
    console.log(acc);
    Toggle();
    setAccountSelected(acc);
  };

  // Delete the account (TODO Later)
  const startDeletion = (index) => {
    setDeleteIndex(index);
    setConfirmDeletion(true);

    setTimeout(() => {
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
      <caption>Accounts</caption>
      <thead>
        <tr>
          <th>Account</th>
          <th>Type</th>
          <th>Amount</th>
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
              <td>£{number}</td>
              {portfolioPage && (
                <>
                  <td className="box-buttons">
                    {index !== deleteIndex && (
                      <>
                        <div
                          className="box edit-box"
                          onClick={() => editAccount(account)}
                        >
                          <i className="fas fa-search"></i>
                        </div>
                        <div
                          className="box delete-box"
                          onClick={() => startDeletion(index)}
                        >
                          <i className="fas fa-trash"></i>
                        </div>
                      </>
                    )}
                    {confirmDeletion && index === deleteIndex && (
                      <div>
                        <button
                          className="box delete-account-btn"
                          onClick={() => confirmDeleteAccount(account)}
                        >
                          Confirm
                        </button>
                      </div>
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
          title={accountSelected.name}
          submitHandler={confirmSub}
        >
          <ModalContent>
            <h3>
              <span>Type:</span>
              <select cols="40" rows="1" defaultValue={accountSelected.type}>
                {types.map((item, index) => (
                  <option key={`option-${index}`} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </h3>
            <h3>
              <Input
                id="balance"
                label="Balance"
                dataType="number"
                errorText={"Enter a value more than 6 characters long"}
                validators={[]}
                onInput={inputHandler}
                initialValid={formState.inputs.balance.valid}
                initialvalue={accountSelected.balance}
              />
            </h3>
          </ModalContent>
        </Modal>
      )}
      {/* Modal for Delete  */}
      {/* Are you sure modal */}

      {confirmSubmission && (
        <Modal
          show={confirmSubmission}
          close={() => setConfirmSubmission(false)}
          title={"Are you sure you want to submit?"}
        >
          You are about to make the following changes:{" "}
        </Modal>
      )}
    </StyledTable>
  );
};

export default Accounts;
