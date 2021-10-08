import React, { useState } from "react";
import Accounts from "./Accounts";
import styled from "styled-components";
import Modal from "./Modal";
import Input from "./Input";

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
    width: 5%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: var(--davys-grey);
    box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.2);

    transition: all 0.2s ease-in-out;
    transition-delay: 0.3s;
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
      width: 25%;
      overflow: hidden;

      background-color: var(--davys-grey);
      box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.2);
      color: var(--cultured);
      transition: all 0.2s ease-in-out;

      span {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

const AccountManager = ({ accounts }) => {
  const [modal, setModal] = useState(false);

  const addAccountHandler = () => {
    setModal(true);
  };

  const closeModal = () => setModal((prev) => !prev);

  return (
    <div>
      <Accounts portfolioPage accounts={accounts} />
      <AccountUpdateContainer>
        <button onClick={addAccountHandler}>
          <i className="fas fa-plus"></i> <span>Add Account</span>
        </button>
      </AccountUpdateContainer>
      <Modal
        show={modal}
        title="Add a new account to the Portfolio"
        close={closeModal}
      >
        <div>
          <Input
            label="Account name"
            currentValue={"test"}
            updateVal={() => {}}
            dataType="text"
          />
          <Input
            label="Account type"
            currentValue={"Investment"}
            updateVal={() => {}}
            dataType="text"
          />
          <Input
            label="Account balance"
            currentValue={5000}
            updateVal={() => {}}
            dataType="number"
          />
        </div>
      </Modal>
    </div>
  );
};

export default AccountManager;
