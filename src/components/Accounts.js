import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

import { StyledTable } from "../styles/tables";
import { commaValue } from "../helpers/commaValue";
import { types } from "../helpers/accountTypes.js";

const Accounts = ({ accounts, portfolioPage }) => {
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);

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
        {accounts.map((account) => {
          const number = commaValue(account.amount);

          return (
            <>
              <tr key={account.name}>
                <td>{account.name}</td>
                <td>{account.type}</td>
                <td>£{number}</td>
                {portfolioPage && (
                  <>
                    <td className="box-buttons">
                      <div className="box edit-box" onClick={() => Toggle()}>
                        <i className="fas fa-search"></i>
                      </div>
                      <div className="box delete-box">
                        <i className="fas fa-trash"></i>
                      </div>
                    </td>
                  </>
                )}
              </tr>
              <Modal show={modal} close={Toggle} title={account.name}>
                <h3>
                  Type:
                  <select cols="40" rows="1" default={account.type}>
                    {types.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </h3>
                <h3>
                  Amount: £
                  <textarea cols="10" rows="1">
                    {account.amount}
                  </textarea>
                </h3>
              </Modal>
            </>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default Accounts;
