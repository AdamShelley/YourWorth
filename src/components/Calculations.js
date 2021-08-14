import React from "react";
import styled from "styled-components";

import { StyledTable } from "../styles/tables";

const Calculations = ({ data }) => {
  return (
    <StyledTable>
      <caption>Projection</caption>

      <thead>
        <tr>
          <th>Date</th>
          <th>Total</th>
          <th>5%</th>
          <th>6%</th>
          <th>7%</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Year 1</td>
          <td>£58,000</td>
          <td>£60,000</td>
          <td>£62,000</td>
          <td>£64,000</td>
        </tr>
        <tr>
          <td>Year 2</td>
          <td>£58,000</td>
          <td>£60,000</td>
          <td>£62,000</td>
          <td>£64,000</td>
        </tr>
        <tr>
          <td>Year 3</td>
          <td>£58,000</td>
          <td>£60,000</td>
          <td>£62,000</td>
          <td>£64,000</td>
        </tr>
      </tbody>
    </StyledTable>
  );
};

export default Calculations;
