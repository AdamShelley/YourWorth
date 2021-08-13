import React from "react";
import styled from "styled-components";
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

  td {
    padding-left: 1rem;
  }
`;

const Accounts = ({ accounts }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Account</th>
          <th>Type</th>
          <th>Amount</th>
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
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};

export default Accounts;
