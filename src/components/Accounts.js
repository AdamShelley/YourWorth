import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import { commaValue } from "../helpers/commaValue";

const StyledTable = styled.table`
  width: 50vw;
  border-collapse: collapse;
  margin-top: 6rem;
  padding: 2rem;
  text-align: left;
  letter-spacing: 1px;
  color: var(--cultured);

  thead > tr:first-child {
    font-weight: 500;
    color: #333;
    border-bottom: 1px solid #333;
    border-top: 1px solid #333;
  }

  td,
  th {
    padding: 0.3rem 0;
  }

  th {
    background-color: #d4d4d4;
    padding-left: 1rem;
  }

  .box-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  td {
    padding-left: 1rem;

    .box {
      background-color: var(--cultured-2);
      border-radius: 2px;
      width: 25px;
      height: 25px;
      color: var(--gunmetal);
      text-align: center;

      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin: 0.2rem;

      i {
        font-size: 0.9rem;
        text-align: center;
      }

      &:hover {
        background-color: var(--slate-gray);
        color: var(--cultured);
        transition: all 0.1s ease;
      }
    }
  }
`;

const Accounts = ({ accounts, portfolioPage }) => {
  const [modal, setModal] = useState(false);
  const Toggle = () => setModal(!modal);

  return (
    <StyledTable>
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
