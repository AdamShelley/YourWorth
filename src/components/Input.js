import React, { useReducer, useEffect } from "react";
import styled from "styled-components";

import { validate } from "../helpers/validators";
import { categories } from "../helpers/accountTypes";

const InputContainer = styled.div`
  color: var(--cultured);
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.alignLeft ? "flex-start" : "center")};
  justify-content: space-evenly;
  width: 100%;
  font-family: "Open Sans", serif;
  margin-top: ${(props) => (props.alignLeft ? "2rem" : "")};

  p {
    color: var(--gunmetal);
  }

  label {
    margin-right: 0.4rem;
    font-size: 1rem;
    font-weight: 100;
    letter-spacing: 1px;
  }

  input {
    margin: ${(props) => (props.alignLeft ? "" : "1rem")};
    margin-top: 0.5rem;
    padding: 0.6rem 0.7rem;
    font-size: 1.1rem;
    text-align: left;
    width: ${(props) => (props.alignLeft ? "100%" : "50%")};
    font-weight: 100;
    border-radius: 2px;
    border: ${(props) =>
      props.alignLeft ? "1px solid var(--slate-gray)" : "none"};
    background-color: ${(props) =>
      props.alignLeft ? "var(--cultured-2)" : "none"};
    box-shadow: 0px 1px 2px rgba(255, 255, 255, 0.5);
    font-family: inherit;
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

  .minimal-input {
    background-color: rgba(0, 0, 0, var(--cultured-2));
    margin-top: 0;
    padding: 0.4rem 0.3rem;
    margin: 0.3rem 0;
    width: 75%;
  }
`;

const SelectContainer = styled.div`
  color: var(--cultured);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly;
  width: 100%;
  font-family: "Open Sans", serif;
  margin-top: 2rem;

  label {
    margin-right: 0.4rem;
    font-size: 1rem;
    font-weight: 100;
    letter-spacing: 1px;
  }

  select {
    margin-top: 0.5rem;
    padding: 0.6rem 0.7rem;
    font-size: 1.1rem;
    text-align: left;
    width: 100%;
    font-weight: 100;
    border-radius: 2px;
    border: 1px solid var(--slate-gray);
    background-color: ${(props) =>
      props.alignLeft ? "var(--cultured-2)" : "none"};
    box-shadow: 0px 1px 2px rgba(255, 255, 255, 0.5);
    font-family: inherit;
    cursor: pointer;
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
  placeholder,
  accountSelected,
  alignLeft,
  dropDown,
  minimalInput,
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
    console.log(event.target.value);
    dispatch({
      type: "CHANGE",
      value: event.target.value ? event.target.value : categories[0],
      validators: validators,
      isBlurred: false,
    });
  };

  const blurHandler = () => {
    dispatch({
      type: "BLUR",
    });
  };

  let input;
  if (dropDown) {
    input = (
      <SelectContainer flex alignLeft>
        <label htmlFor={label}>{label}</label>
        <select
          name={label}
          cols="40"
          rows="1"
          defaultValue={accountSelected && accountSelected.category}
          onChange={changeHandler}
          value={inputState.value}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </SelectContainer>
    );
  } else {
    input = (
      <InputContainer
        flex
        alignLeft
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
          placeholder={placeholder}
          className={`${minimalInput ? " minimal-input" : ""}`}
        />
        {errorText && !inputState.valid && inputState.isBlurred && (
          <p>{errorText}</p>
        )}
      </InputContainer>
    );
  }

  return <>{input}</>;
};

export default Input;
