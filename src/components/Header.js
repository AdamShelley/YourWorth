import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AuthenticationContext } from "../context/authenticate-context";

const StyledHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  padding: 2rem;
  /* background-color: var(--cultured); */
  color: var(--cultured);

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    a:first-child {
      text-decoration: none;
    }
  }

  h1 {
    font-size: 2rem;
    font-weight: 100;
    margin: 0 0.5rem;
    position: relative;

    color: var(--cadet-blue-crayola);

    span {
      color: var(--cultured);
      font-size: 2.8rem;
      opacity: 0.8;
      letter-spacing: 1px;
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin: 0 1rem;

    li {
      height: 100%;
      margin: 0.6rem;
      /* padding: 0.5rem; */
      font-size: 0.9rem;
      cursor: pointer;
      letter-spacing: 0.5px;

      /* &:hover {
        color: #777;
      } */

      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }

  .selected {
    color: var(--light-gray);
    font-weight: 500;
    border-bottom: 1px solid var(--light-gray);
  }

  .logout-button {
    background-color: transparent;
    border: none;
    color: var(--cultured);
    font-family: inherit;
    font-size: inherit;
  }
`;

const Header = () => {
  const auth = useContext(AuthenticationContext);

  return (
    <StyledHeader>
      <nav>
        <NavLink exact to="/">
          <h1>
            <span>Y</span>our<span>W</span>orth
          </h1>
        </NavLink>
        <ul>
          {auth.isLoggedIn && (
            <li>
              <NavLink exact activeClassName="selected" to="/">
                Dashboard
              </NavLink>
            </li>
          )}

          {auth.isLoggedIn && (
            <li>
              <NavLink activeClassName="selected" to="/account">
                Account
              </NavLink>
            </li>
          )}
          {!auth.isLoggedIn && (
            <li>
              <NavLink exact activeClassName="selected" to="/signup">
                Login
              </NavLink>
            </li>
          )}
          {auth.isLoggedIn && (
            <li>
              <button className="logout-button" onClick={auth.logout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;
