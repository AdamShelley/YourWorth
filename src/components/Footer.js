import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--slate-gray);
  background-color: var(--cards);
  height: 10vh;
  width: 100%;
  color: var(--cultured);
  font-family: "Open Sans", serif;
  font-size: 0.9rem;
  padding: 2rem;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: left;
  }

  p {
    margin-top: 0.2rem;
    letter-spacing: 0.5px;
    font-weight: 400;
    color: var(--cultured-2);
    line-height: 1.6;

    a {
      text-decoration: none;
      color: var(--cultured);

      &:hover {
        color: lightblue;
      }
    }
  }

  i {
    color: var(--cultured);
    font-size: 2rem;

    &:hover {
      color: var(--gainsboro);
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <a href="https://github.com/AdamShelley" target="_blank" rel="noreferrer">
        <i className="fab fa-github"></i>
      </a>

      <div>
        <p>Created by Adam Shelley</p>
        <p>
          Visit me
          <a href="http://www.adamshelley.com" target="_blank" rel="noreferrer">
            {" "}
            here!
          </a>
        </p>
      </div>
    </StyledFooter>
  );
};

export default Footer;
