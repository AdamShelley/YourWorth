import React, { useState, useContext } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import Modal from "./Modal";
import { useFetchHook } from "../hooks/fetch-hook";
import { StyledTable, StyledModalTable } from "../styles/tables";
import { useForm } from "../hooks/form-hook";
import { AuthenticationContext } from "../context/authenticate-context";
import useWindowDimensions from "../hooks/window-hook";
import Input from "./Input";
import { ReactComponent as Trash } from "../images/trash.svg";

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

const Accounts = ({
  accounts,
  netWorth,
  portfolioPage,
  onDelete,
  updateNetWorth,
  updateAccountList,
}) => {
  const auth = useContext(AuthenticationContext);
  const [modal, setModal] = useState(false);
  const [accountSelected, setAccountSelected] = useState();
  const [confirmSubmission, setConfirmSubmission] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState();
  const { sendRequest, loading } = useFetchHook();
  const { height, width } = useWindowDimensions();

  console.log(width);

  const [formState, inputHandler] = useForm(
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

  // Toggle function for the modal
  const Toggle = () => {
    setModal(!modal);
    preventScroll();
  };

  // Helper function to prevent & re-enable scrolling
  const preventScroll = () => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  };

  // Confirm modal helper function
  const confirmSub = () => {
    setModal(false);
    setConfirmSubmission(true);
  };

  // Submit edit modal data to the backend
  const submitUpdate = async () => {
    preventScroll();

    // Update frontend
    const newAccounts = accounts.map((acc) => {
      if (acc._id === accountSelected._id) {
        return (acc = {
          ...acc,
          name: formState.inputs.name.value,
          category: formState.inputs.category.value,
          balance: parseFloat(formState.inputs.balance.value),
        });
      }
      return acc;
    });

    updateAccountList(newAccounts);

    updateNetWorth(newAccounts);

    // Submit to backend
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/accounts/${accountSelected._id}`,
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
    console.log("clicked edit");
    Toggle();
    setAccountSelected(acc);
  };

  // Delete the account
  const startDeletion = (index) => {
    clearTimeout(confirmTimer);
    setDeleteIndex(index);
    setConfirmDeletion(true);

    confirmTimer = setTimeout(() => {
      setConfirmDeletion(false);
      setDeleteIndex(null);
    }, 3000);
  };

  // Confirm deletion to the backend
  const confirmDeleteAccount = async (account) => {
    setDeleteIndex(null);
    setConfirmDeletion(false);
    preventScroll();

    // Send request to backend to delete the account
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/accounts/${account._id}`,
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
    <StyledTable tlayout accountManager>
      {/* <caption>Accounts</caption> */}
      <thead>
        <tr>
          <th>Account</th>
          <th>Type</th>
          <th>% of Portfolio</th>
          <th style={{ textAlign: "right" }}>Balance</th>
          {portfolioPage && <th></th>}
        </tr>
      </thead>
      <tbody>
        {accounts.map((account, index) => {
          const number = account.balance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          });

          const percentOfNetWorth = parseFloat(
            (account.balance / netWorth) * 100
          );

          return (
            <tr
              key={`row-${index}`}
              onClick={width <= 425 ? () => editAccount(account) : undefined}
            >
              <td>{account.name}</td>
              <td>{account.category}</td>
              <td style={{ textAlign: "center" }}>
                {percentOfNetWorth.toFixed(0)}%
              </td>
              <td style={{ textAlign: "right" }}>£{number}</td>
              {portfolioPage && (
                <>
                  <td
                    className="box-buttons"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {index !== deleteIndex && (
                      <>
                        {width > 425 && (
                          <>
                            <div
                              className="box edit-box"
                              onClick={() => editAccount(account)}
                            >
                              Edit
                            </div>
                            <span className="box box-sep">|</span>{" "}
                          </>
                        )}

                        {width <= 425 ? (
                          <Trash onClick={() => startDeletion(index)} />
                        ) : (
                          <div
                            className="box delete-box"
                            onClick={() => startDeletion(index)}
                          >
                            Delete
                          </div>
                        )}
                      </>
                    )}
                    {confirmDeletion && index === deleteIndex && (
                      <button
                        href="/"
                        className="box delete-account-btn"
                        onClick={() => confirmDeleteAccount(account)}
                      >
                        {width >= 425 ? "Click to confirm" : "Confirm"}
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
          modalSize={
            width >= 2000
              ? "small"
              : width >= 1440
              ? "medium"
              : width >= 750
              ? "large"
              : "all"
          }
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
              darkInput
            />
            <Input
              dropDown
              id="category"
              label="Category"
              errorText={"Please enter a category"}
              onInput={inputHandler}
              validators={[]}
              initialValue={accountSelected.category}
              darkInput
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
              darkInput
            />
          </ModalContent>
        </Modal>
      )}
      {/* Modal for Delete  */}
      {/* Are you sure modal */}

      {confirmSubmission && (
        <Modal
          show={confirmSubmission}
          close={() => {
            preventScroll();
            setConfirmSubmission(false);
          }}
          title={"Confirm your changes: "}
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
                <td style={{ borderRight: "1px solid var(--card-header)" }}>
                  Name
                </td>
                <td style={{ borderRight: "1px solid var(--card-header)" }}>
                  {accountSelected.name}
                </td>
                <td>{formState.inputs.name.value}</td>
              </tr>
              <tr>
                <td style={{ borderRight: "1px solid var(--card-header)" }}>
                  Category
                </td>
                <td style={{ borderRight: "1px solid var(--card-header)" }}>
                  {accountSelected.category}
                </td>
                <td>{formState.inputs.category.value}</td>
              </tr>
              <tr>
                <td style={{ borderRight: "1px solid var(--card-header)" }}>
                  Balance
                </td>
                <td style={{ borderRight: "1px solid var(--card-header)" }}>
                  {accountSelected.balance}
                </td>
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
