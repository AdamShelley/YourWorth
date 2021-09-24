import React, { useState } from "react";
import Accounts from "./Accounts";
import styled from "styled-components";
import Modal from "./Modal";
import FancyButton from "./FancyButton";

const AccountUpdateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: 2rem;

  button {
    margin: 1rem;
    padding: 0.7rem 1.2rem;
    text-align: center;
    border: 1px solid transparent;
    background-color: var(--cultured);
    color: var(--gunmetal);
    border-radius: 1px;
    cursor: pointer;
    width: 5%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    transition: all 0.3s ease-out;
    transition-delay: 0.5s;
    max-height: 2rem;

    span {
      color: var(--cultured);
      opacity: 0;
      margin-left: 1rem;
      overflow: hidden;
      transition-delay: 0.2s;
    }

    &:hover {
      width: 25%;
      overflow: hidden;
      /* background-color: var(--davys-gray); */
      background-color: #21b800;
      color: var(--cultured);
      transition: all 0.2s ease-in;
      border: 1px solid #00b400;

      span {
        opacity: 1;
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

        <button onClick={() => {}}>
          <i className="fas fa-minus"></i> <span>Delete Account</span>
        </button>
      </AccountUpdateContainer>
      <Modal
        show={modal}
        title="Add a new account to the Portfolio"
        close={closeModal}
      >
        <div>Adding some content to the modal</div>
      </Modal>
    </div>
  );
};

export default AccountManager;
