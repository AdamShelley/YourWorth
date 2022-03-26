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

const SignupPageStyles = styled.div`
  height: 85vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 28rem;
  /* height: 40rem; */
  background-color: transparent;

  font-family: "Open Sans", serif;
  color: var(--cultured-2);
  border-radius: 3px;
  /* border-top: 8px solid var(--card-header); */
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  .signup-container-content {
    padding: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 400;
    letter-spacing: 0.5px;
    color: var(--cultured);
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      color: var(--cultured-2);
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

  .helper-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;

    > div {
      display: flex;
      align-items: center;

      label {
        font-size: 0.8rem;
        margin-left: 0.3rem;
      }
      > input {
      }
    }

    > button {
      border: none;
      background-color: transparent;
      font-weight: 100;
      color: var(--gunmetal);
    }
  }

  .login-button {
    margin-top: 4rem;
    background-color: var(--card-header);
    color: var(--cultured);

    &:hover {
    }
  }

  .login-button:disabled {
    background-color: var(--cultured);
    cursor: not-allowed;
    color: #ccc;
  }

  .switch-button-container {
    background-color: transparent;
    width: 100%;
    min-height: 5rem;
    height: 100%;
    border-radius: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .switch-button {
    width: 100%;
    border: none;
    background-color: transparent;
    cursor: pointer;
    flex: 1;
    font-size: 0.9rem;
    color: var(--gainsboro);
    line-height: 1.8;
    letter-spacing: 0.3px;
  }

  @media screen and (max-width: 1023px) {
    width: 25rem;

    .signup-container-content {
      margin-top: 2rem;
      padding: 2rem;
    }
  }

  @media screen and (max-width: 768px) {
    width: 25rem;

    .signup-container-content {
      padding: 1.5rem;
    }

    .switch-button-container {
      height: 3rem;
      align-self: flex-end;
    }
  }

  @media screen and (max-width: 425px) {
    width: 70%;
    border-top: none;

    .signup-container-content {
      padding: 0.5rem;

      h2 {
        color: var(--cultured);
        font-size: 1.2rem;
        align-self: flex-start;
        font-weight: 300;
      }

      > form > div {
        margin-top: 2rem;

        input {
          font-size: 1rem;
          font-weight: 800;
        }

        label {
          color: var(--cultured-2);
        }
      }

      p {
        color: var(--cultured-2);
        text-align: center;
        margin-top: 1rem;
      }

      > form > button {
        margin-top: 2rem;
        /* border: 1px solid var(--cultured-2); */
        background-color: var(--card-header);
        width: 70%;
        align-self: center;
      }
    }

    .login-button:disabled {
      /* background-color: var(--cultured); */
      background-color: var(--card-header);
      cursor: not-allowed;
      color: var(--cards);
    }

    .switch-button-container {
      background-color: transparent;
      box-shadow: none;
    }
  }

  @media screen and (max-width: 375px) {
  }
`;

const SignupPage = () => {
  const [loginMode, setLoginMode] = useState(true);
  const history = useHistory();

  const auth = useContext(AuthenticationContext);
  const { sendRequest, error, loading } = useFetchHook();
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

        auth.login(
          responseData.userId,
          responseData.token,
          responseData.firstTimeUser
        );

        if (responseData.firstTimeUser) {
          history.push("/setup");
        } else {
          history.push("/");
        }
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
        auth.login(responseData.userId, responseData.token, true);

        history.push("/setup");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const loginTestAccount = async () => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_ADDRESS}/users/login`,
        "POST",
        JSON.stringify({ email: "testing@test.com", password: "test123456" }),
        {
          "Content-Type": "application/json",
        }
      );

      auth.login(
        responseData.userId,
        responseData.token,
        responseData.firstTimeUser
      );

      if (responseData.firstTimeUser) {
        history.push("/setup");
      } else {
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SignupPageStyles>
      <SignupContainer>
        {!loading && (
          <>
            <div className="signup-container-content">
              <h2>
                {loginMode ? "Sign in to your account" : "Create your account"}
              </h2>
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

                <button
                  className="button login-button"
                  disabled={!formState.formValid}
                >
                  {loginMode ? "Login" : "Signup"}
                </button>
                {error && <p>{error}</p>}
              </form>
            </div>

            <div className="switch-button-container">
              <button className="switch-button" onClick={switchModeHandler}>
                {!loginMode
                  ? "Have an account? Log in instead"
                  : `Don't have an account? Sign up `}
              </button>
            </div>
            <button
              className="switch-button test-account"
              onClick={loginTestAccount}
            >
              Test account for visitors
            </button>
          </>
        )}
        {loading && (
          <>
            <Loader
              type="Rings"
              color="var(--cultured-2)"
              height={"100%"}
              width={"100%"}
            />
            <p
              style={{
                textAlign: "center",
                padding: "1rem",
                color: "var(--cultured-2)",
              }}
            >
              Please wait - Spinning up database
            </p>
          </>
        )}
      </SignupContainer>
    </SignupPageStyles>
  );
};

export default SignupPage;
