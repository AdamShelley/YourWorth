import React from "react";
import Accounts from "./Accounts";
import styled from "styled-components";

const AccountUpdateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;

  button {
    margin: 1rem;
    padding: 1rem;
    border: 1px solid var(--gunmetal);
    background-color: var(--cultured);
    color: var(--gunmetal);
    border-radius: 2px;
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
  return (
    <div>
      <Accounts portfolioPage accounts={accounts} />
      <AccountUpdateContainer>
        <button>
          <i className="fas fa-plus"></i> Add
        </button>
      </AccountUpdateContainer>
    </div>
  );
};

export default AccountManager;
