import React from "react";
import styled from "styled-components";
import Input from "../components/Input";

import { useForm } from "../hooks/form-hook";

const AccountPageStyles = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  margin-top: 4rem;
  min-height: 100vh;
`;

const AccountPage = () => {
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        valid: false,
      },
      age: {
        value: "",
        valid: false,
      },
      targetAge: {
        value: "",
        valid: false,
      },
      targetNetWorth: {
        value: "",
        valid: false,
      },
    },
    false
  );

  return (
    <>
      <h2>Account</h2>
      <AccountPageStyles>
        <div>
          <h4>Account Details</h4>
          <Input label="Name" validators={[]} onInput={inputHandler} />
          <Input label="Age" validators={[]} onInput={inputHandler} />
          <Input
            label="Target Retirement Age"
            validators={[]}
            onInput={inputHandler}
          />
          <Input
            label="Target Retirement Goal"
            validators={[]}
            onInput={inputHandler}
          />
        </div>
        <div>
          <h4>Control Panel</h4>
          <select name="currency" id="">
            <option value="" default selected>
              Change currency
            </option>
          </select>
          <button>Delete ALL Data</button>
          <button>Delete Account</button>
        </div>
      </AccountPageStyles>
    </>
  );
};

export default AccountPage;
