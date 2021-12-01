import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-top: 1px solid var(--slate-gray);
  /* background-color: var(--cards); */
  height: 10vh;
  width: 100%;
  color: var(--cultured-2);
  font-family: "Open Sans", serif;
  font-size: 0.9rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div>Created by Adam Shelley</div>
      <div>Github link here</div>
      <a href="http://www.adamshelley.com">adamshelley.com</a>
    </StyledFooter>
  );
};

export default Footer;
