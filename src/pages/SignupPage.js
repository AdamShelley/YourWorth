import React, { useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  width: 25rem;
  background-color: var(--cards);
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.2);
  font-family: "Open Sans", serif;

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    width: 90%;
  }

  button {
    padding: 0.5rem 1rem;
  }
`;

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SIGNUP - Link to Backend
  // Should check if in signup mode or login mode
  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SignupContainer>
      <h2>Signup</h2>
      <form onSubmit={submitHandler}>
        <Input
          label="Name"
          currentValue={name}
          updateVal={setName}
          dataType="text"
          leftSide
        />
        <Input
          label="Email"
          currentValue={email}
          updateVal={setEmail}
          dataType="text"
        />
        <Input
          label="Password"
          currentValue={password}
          updateVal={setPassword}
          dataType="text"
        />
        <button>Submit</button>
      </form>
    </SignupContainer>
  );
};

export default SignupPage;
