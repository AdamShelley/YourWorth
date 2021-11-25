import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--cards);
  height: 10vh;
  width: 100%;
  margin-top: 5rem;
`;

const Footer = () => {
  return <StyledFooter>This is the footer area</StyledFooter>;
};

export default Footer;
