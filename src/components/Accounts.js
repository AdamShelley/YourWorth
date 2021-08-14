import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

import { StyledTable } from "../styles/tables";
import { commaValue } from "../helpers/commaValue";

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
          );
        })}
      </tbody>
      <Modal show={modal} close={Toggle} />
    </StyledTable>
  );
};

export default Accounts;
