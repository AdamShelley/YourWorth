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
import { ButtonStyled } from "../styles/inputStyles";

const AccountUpdateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  

  button {
    margin-right: 1rem;
    padding: 1.5rem 0.5rem;
    width: 10rem;
    max-height: 2rem;
    box-shadow: 0px 1px 1px rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    i {
      margin-right: 0.7rem;
      font-size: 0.6rem;
    }

    span {
      font-size: 0.8rem;
      text-align: justify;
      text-justify: auto;
      text-align: center;
      color: var(--cultured);
      overflow: hidden;
      transition-delay: 0.2s;
    }
  }
`;

const AccountManager = ({ accounts, updateLoadedUser, updateNetWorth }) => {
  const [modal, setModal] = useState(false);
  const [advanceModal, setAdvanceModal] = useState(false);
  const [loadedAccounts, setLoadedAccounts] = useState(accounts);
  const { sendRequest, loading } = useFetchHook();
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

  const addAccountHandler = () => {
    setModal(true);
    preventScroll();
  };
  const closeModal = () => {
    setModal((prev) => !prev);
    preventScroll();
  };

  const preventScroll = () => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };

  // ADD NEW ACCOUNT
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

      console.log(response);

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
    preventScroll();

    setFormData(
      {
        ...formState.inputs,
        name: undefined,
        category: undefined,
      },
      false
    );
  };

  // Save snapshots of the current accounts
  const submitNewSnapshot = async () => {
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
      const response = await sendRequest(
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

      // Feed the correct values in for a component load via filter
      console.log(response.user);

      setLoadedAccounts([...response.user.accounts]);
      updateNetWorth(null, response.user.netWorth);

      setAdvanceModal(false);
      preventScroll();
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
        <ButtonStyled onClick={addAccountHandler}>
          <i className="fas fa-plus"></i> <span>Add Account</span>
        </ButtonStyled>
        <ButtonStyled onClick={advanceAllHandler}>
          <i className="fas fa-arrow-right"></i> <span>Update all</span>
        </ButtonStyled>
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
            darkInput
          />

          <Input
            dropDown
            id="category"
            label="Category"
            errorText={"Please enter a category"}
            onInput={inputHandler}
            validators={[requiredValidator()]}
            initialValid={true}
            initialValue={"Investments"}
            darkInput
          />

          <Input
            id="balance"
            label="Account balance"
            dataType="number"
            errorText={"Please enter a balance"}
            onInput={inputHandler}
            validators={[requiredValidator()]}
            darkInput
          />
        </div>
        {loading && (
          <Loader type="Rings" color="#00BFFF" height={80} width={80} />
        )}
      </Modal>
      <Modal
        show={advanceModal}
        title="Update all values for the database"
        close={() => {
          setAdvanceModal(false);
          preventScroll();
        }}
        submitHandler={submitNewSnapshot}
        modalSize="large"
      >
        <StyledModalTable>
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ textAlign: "center" }}>Before</th>
              <th style={{ paddingLeft: "1rem", textAlign: "center" }}>
                After
              </th>
            </tr>
          </thead>
          <tbody>
            {/* The before updating */}

            {loadedAccounts.map((acc) => (
              <tr key={acc._id}>
                <td>{acc.name}</td>
                <td style={{ textAlign: "right" }}>
                  £{acc.balance.toFixed(2)}
                </td>
                <td style={{ paddingLeft: "1rem" }}>
                  <Input
                    updateAllModal
                    id={acc.name}
                    label={""}
                    dataType="number"
                    onInput={inputHandler}
                    validators={[]}
                    darkInput
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </StyledModalTable>
        <p>Leaving values empty will keep the previous balance.</p>
      </Modal>
    </div>
  );
};

export default AccountManager;
