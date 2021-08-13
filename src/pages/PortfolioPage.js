import React from "react";
import styled from "styled-components";

const PortfolioPage = ({ data }) => {
  console.log(data);

  return (
    <div>
      <h2>Portfolio</h2>
      <p>Networth</p>
      <div>Pie Charts here</div>
      <ul>
        List of accounts
        <li>DELETE Account</li>
        <li>ADD Account</li>
        <li>Edit Account</li>
      </ul>
    </div>
  );
};

export default PortfolioPage;
