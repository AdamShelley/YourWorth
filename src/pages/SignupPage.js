import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import Input from "../components/Input";
import Loader from "react-loader-spinner";

import { useForm } from "../hooks/form-hook";
import { AuthenticationContext } from "../context/authenticate-context";
import { useFetchHook } from "../hooks/fetch-hook";

import {
  emailValidator,
  minLengthValidator,
  requiredValidator,
} from "../helpers/validators";

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 4rem;
  width: 25rem;
  height: 35rem;
  background-color: var(--cultured);
  box-shadow: 1px 2px 1px rgba(255, 255, 255, 0.3);
  font-family: "Open Sans", serif;
  color: var(--gunmetal);
  border-radius: 3px;

  h2 {
    font-size: 2rem;
    font-weight: 100;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      color: var(--gunmetal);
    }
  }

  .button {
    padding: 0.8rem 1rem;
    margin-top: 1rem;
    border: none;
    font-size: 1rem;
    letter-spacing: 1px;
    cursor: pointer;
    font-weight: 100;
    border-radius: 3px;
  }

  .login-button {
    background-color: var(--cards);
    color: var(--cultured);

    &:hover {
    }
  }

  .login-button:disabled {
    background-color: var(--cultured);
    cursor: not-allowed;
    color: #ccc;
  }

  .switch-button {
    width: 100%;
    border: none;
    background-color: transparent;
    margin-top: 2rem;
    cursor: pointer;
    flex: 1;
  }
`;

const SignupPage = () => {
  const [loginMode, setLoginMode] = useState(true);
  const history = useHistory();

  const auth = useContext(AuthenticationContext);
  const { sendRequest, error, loading, clearError } = useFetchHook();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        valid: false,
      },
      password: {
        value: "",
        valid: false,
      },
    },
    false
  );

  // Switch between login and signup
  const switchModeHandler = () => {
    if (!loginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.valid && formState.inputs.password.valid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            valid: false,
          },
        },
        false
      );
    }
    setLoginMode((prev) => !prev);
  };

  // SIGNUP - Link to Backend
  // Should check if in signup mode or login mode
  const submitHandler = async (e) => {
    e.preventDefault();

    if (loginMode) {
      const data = {
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      };

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/users/login`,
          "POST",
          JSON.stringify(data),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.userId, responseData.token);
        history.push("/");
      } catch (err) {
        console.log(err);
      }
    } else {
      const data = {
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      };

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_ADDRESS}/users/signup`,
          "POST",

          JSON.stringify(data),
          {
            "Content-Type": "application/json",
          }
        );

        // redirect to homepage or settings
        auth.login(responseData.userId, responseData.token);

        history.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <SignupContainer>
      <h2>{loginMode ? "Log in" : "Signup"}</h2>
      <form onSubmit={submitHandler}>
        {!loginMode && (
          <Input
            alignLeft
            id="name"
            label="Name"
            dataType="text"
            errorText={"Please enter a name."}
            validators={[requiredValidator()]}
            onInput={inputHandler}
          />
        )}
        <Input
          alignLeft
          id="email"
          label="Email Address"
          dataType="text"
          errorText={"Please enter a correct email address"}
          validators={[requiredValidator(), emailValidator()]}
          onInput={inputHandler}
        />
        <Input
          alignLeft
          id="password"
          label="Password"
          dataType="password"
          errorText={"Enter a password more than 6 characters long"}
          validators={[requiredValidator(), minLengthValidator(6)]}
          onInput={inputHandler}
        />
        <button className="button login-button" disabled={!formState.formValid}>
          {loginMode ? "Login" : "Signup"}
        </button>
        {error && <p>{error}</p>}
      </form>

      <button className="switch-button" onClick={switchModeHandler}>
        {!loginMode
          ? "Have an account? Log in instead"
          : `Don't have an account? Sign up `}
      </button>

      {loading && (
        <Loader type="Rings" color="#00BFFF" height={80} width={80} />
      )}
    </SignupContainer>
  );
};

export default SignupPage;