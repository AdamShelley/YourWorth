import React, { useContext, useState } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
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
      /* margin: 0.6rem; */
      padding: 0.5rem;
      font-size: 0.9rem;
      cursor: pointer;
      letter-spacing: 0.5px;
      transition: all 0.1s ease-in;
      border-radius: 3px;

      a {
        text-decoration: none;
        color: inherit;
        padding: 0.6rem;
        line-height: 1.8;
        font-size: 0.9rem;
        color: var(--cultured);

        &:hover {
          background-color: var(--davys-grey);
        }
      }
    }
  }

  .selected {
    font-weight: 500;
    /* border-bottom: 1px solid var(--light-gray); */
    padding: 0.6rem;
    border-radius: 3px;
    background-color: var(--davys-grey);
  }

  .logout-button {
    background-color: transparent;
    border: none;
    color: var(--cultured);
    font-family: inherit;
    font-size: inherit;
    position: relative;
    cursor: pointer;
    line-height: 1.8;
    font-size: 0.9rem;
  }

  @media screen and (max-width: 1023px) {
  }

  @media screen and (max-width: 768px) {
  }

  @media screen and (max-width: 425px) {
    nav {
      flex-direction: column;

      ul {
        margin-top: 1rem;

        li {
          padding: 0.3rem;
        }
        li a,
        .logout-button {
          font-size: 0.7rem;
        }
      }
    }
  }

  @media screen and (max-width: 375px) {
  }
`;

const StyledLogoutModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--card-header);
  background-color: var(--cards);
  padding: 1rem;
  position: absolute;
  right: 2rem;
  margin-top: 1rem;

  p {
    font-weight: 500;
    font-family: "Open Sans", serif;
    color: var(--cultured);
  }

  div {
    margin-top: 1rem;
    display: flex;
    width: 100%;
    justify-content: space-evenly;

    button {
      padding: 0.2rem 0.5rem;
      margin: 0.2rem;
      width: 4rem;
      cursor: pointer;
    }
  }
`;

let logoutTimer;

const Header = () => {
  const auth = useContext(AuthenticationContext);
  const history = useHistory();
  const [logoutModal, setLogoutModal] = useState(false);

  const logoutConfirmation = () => {
    clearTimeout(logoutTimer);
    setLogoutModal(true);
    logoutTimer = setTimeout(() => {
      setLogoutModal(false);
    }, 5000);
  };

  const confirmLogout = () => {
    clearTimeout(logoutTimer);
    auth.logout();
    setLogoutModal(false);
    history.push("/signup");
  };

  const LogoutModal = () => {
    return (
      <StyledLogoutModal>
        <p>Are you sure?</p>
        <div>
          <button onClick={confirmLogout}>Yes</button>
          <button onClick={() => setLogoutModal(false)}>No</button>
        </div>
      </StyledLogoutModal>
    );
  };

  return (
    <StyledHeader>
      <nav>
        <NavLink exact to="/">
          <h1>
            <span>Y</span>our<span>W</span>orth
          </h1>
        </NavLink>
        <ul>
          {auth.isLoggedIn && !auth.firstTimeUser && (
            <li>
              <NavLink exact activeClassName="selected" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
          )}

          {auth.isLoggedIn && !auth.firstTimeUser && (
            <li>
              <NavLink activeClassName="selected" to="/account">
                Account
              </NavLink>
            </li>
          )}
          {!auth.isLoggedIn && (
            <li>
              <NavLink activeClassName="selected" to="/splash">
                About
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
              <button className="logout-button" onClick={logoutConfirmation}>
                Logout
              </button>
              {logoutModal && <LogoutModal />}
            </li>
          )}
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;
