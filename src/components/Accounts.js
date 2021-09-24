import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

import { StyledTable } from "../styles/tables";
import { commaValue } from "../helpers/commaValue";
import { types } from "../helpers/accountTypes.js";

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

const Accounts = ({ accounts, portfolioPage }) => {
  const [modal, setModal] = useState(false);
  const [accountSelected, setAccountSelected] = useState();
  const [confirmSubmission, setConfirmSubmission] = useState(false);

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

  return (
    <StyledTable>
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
          const number = commaValue(account.amount);

          return (
            <tr key={`row-${index}`}>
              <td>{account.name}</td>
              <td>{account.type}</td>
              <td>£{number}</td>
              {portfolioPage && (
                <>
                  <td className="box-buttons">
                    <div
                      className="box edit-box"
                      onClick={() => editAccount(account)}
                    >
                      <i className="fas fa-search"></i>
                    </div>
                    <div className="box delete-box">
                      <i className="fas fa-trash"></i>
                    </div>
                  </td>
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
              <span>Amount: </span>
              <textarea
                cols="10"
                rows="1"
                defaultValue={accountSelected.amount}
              ></textarea>
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
