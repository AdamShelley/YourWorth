import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

import { StyledTable } from "../styles/tables";
import { commaValue } from "../helpers/commaValue";
import { types } from "../helpers/accountTypes.js";

const Accounts = ({ accounts, portfolioPage }) => {
  const [modal, setModal] = useState(false);
  const [accountSelected, setAccountSelected] = useState();

  const Toggle = () => setModal(!modal);

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
        <Modal show={modal} close={Toggle} title={accountSelected.name}>
          <h3>
            Type:
            <select cols="40" rows="1" defaultValue={accountSelected.type}>
              {types.map((item, index) => (
                <option key={`option-${index}`} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </h3>
          <h3>
            Amount: £
            <textarea
              cols="10"
              rows="1"
              defaultValue={accountSelected.amount}
            ></textarea>
          </h3>
        </Modal>

        // Modal for Delete
      )}
    </StyledTable>
  );
};

export default Accounts;
