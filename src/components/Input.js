import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  color: var(--cultured);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  label {
    margin-right: 0.4rem;
  }

  input {
    margin: 1rem;
    padding: 0.3rem 0.5rem;
    font-size: 1rem;
    text-align: center;
    width: 50%;
    font-weight: 100;
  }
`;

const Input = ({ label, currentValue, updateVal }) => {
  return (
    <InputContainer>
      <label htmlFor={label}>{label}</label>
      <input
        name={label}
        type="number"
        value={currentValue}
        onChange={(e) => updateVal(e.target.value)}
      />
    </InputContainer>
  );
};

export default Input;
