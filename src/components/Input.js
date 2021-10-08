import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  color: var(--cultured);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  font-family: "Open Sans", serif;

  label {
    margin-right: 0.4rem;
    font-size: 1rem;
    font-weight: 100;
    letter-spacing: 1px;
  }

  input {
    margin: 1rem;
    padding: 0.6rem 0.7rem;
    font-size: 1.1rem;
    text-align: center;
    width: 50%;
    font-weight: 100;
    border-radius: 2px;
    border: none;
    box-shadow: 0px 1px 2px rgba(255, 255, 255, 0.5);
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`;

const Input = ({ label, currentValue, updateVal, dataType, flex }) => {
  return (
    <InputContainer flex>
      <label htmlFor={label}>{label}</label>
      <input
        name={label}
        type={dataType}
        value={currentValue}
        onChange={(e) => updateVal(e.target.value)}
      />
    </InputContainer>
  );
};

export default Input;
