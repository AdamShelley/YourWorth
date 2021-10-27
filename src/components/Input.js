import React, { useReducer, useEffect } from "react";
import styled from "styled-components";
import { validate } from "../helpers/validators";

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

  .input-invalid {
    color: red;
  }
`;

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        valid: validate(action.value, action.validators),
      };
    case "BLUR":
      return {
        ...state,
        isBlurred: true,
      };
    default:
      return state;
  }
};

const Input = ({
  id,
  label,
  dataType,
  errorText,
  validators,
  onInput,
  initialValue,
  initialValid,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || "",
    valid: initialValid || false,
  });

  const { value, valid } = inputState;

  useEffect(() => {
    onInput(id, value, valid);
  }, [id, onInput, value, valid]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      value: event.target.value,
      validators: validators,
      isBlurred: false,
    });
  };

  const blurHandler = () => {
    dispatch({
      type: "BLUR",
    });
  };

  return (
    <InputContainer
      flex
      className={`${
        !inputState.valid && inputState.isBlurred && "input-invalid"
      }`}
    >
      <label htmlFor={label}>{label}</label>
      <input
        name={label}
        type={dataType}
        value={inputState.value}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
      {!inputState.valid && inputState.isBlurred && <p>{errorText}</p>}
    </InputContainer>
  );
};

export default Input;
