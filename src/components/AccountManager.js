import React, { useState } from "react";
import Accounts from "./Accounts";
import styled from "styled-components";
import Modal from "./Modal";

const AccountUpdateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;

  button {
    margin: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    background-color: var(--cultured);
    color: var(--gunmetal);
    border-radius: 1px;
    cursor: pointer;

    &:hover {
      background-color: var(--gunmetal);
      color: var(--cultured);
      transition: all 0.2s ease-in;
      border: 1px solid var(--cultured);
    }
  }
`;

const AccountManager = ({ accounts }) => {
  const [modal, setModal] = useState(false);

  const addAccountHandler = () => {
    setModal(true);
  };

  return (
    <div>
      <Accounts portfolioPage accounts={accounts} />
      <AccountUpdateContainer>
        <button onClick={addAccountHandler}>
          <i className="fas fa-plus"></i> Add Account
        </button>
      </AccountUpdateContainer>
      <Modal show={modal} />
    </div>
  );
};

export default AccountManager;
