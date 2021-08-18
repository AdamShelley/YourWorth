import React from "react";
import styled from "styled-components";

import { StyledTable } from "../styles/tables";

const Calculations = ({ data }) => {
  return (
    <>
      <StyledTable fullscreen>
        <caption>Projection</caption>

        <thead>
          <tr>
            <th>Year</th>
            <th>Age</th>
            <th>Total</th>
            <th>3%</th>
            <th>5%</th>
            <th>7%</th>
            <th>10%</th>
            <th>Monthly</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Year 1</td>
            <td>30</td>
            <td>£58,000</td>
            <td>£60,000</td>
            <td>£62,000</td>
            <td>£64,000</td>
            <td>£74,000</td>
            <td>£1000</td>
          </tr>
          <tr>
            <td>Year 2</td>
            <td>31</td>
            <td>£58,000</td>
            <td>£60,000</td>
            <td>£62,000</td>
            <td>£64,000</td>
            <td>£74,000</td>
            <td>£1000</td>
          </tr>
          <tr>
            <td>Year 3</td>
            <td>32</td>
            <td>£58,000</td>
            <td>£60,000</td>
            <td>£62,000</td>
            <td>£64,000</td>
            <td>£74,000</td>
            <td>£1000</td>
          </tr>
        </tbody>
      </StyledTable>
      <div style={{ marginBottom: "20vh" }}></div>
    </>
  );
};

export default Calculations;
