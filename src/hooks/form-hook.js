import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formValid = true;
      // Checking each input in state
      for (const inputId in state.inputs) {
        // If undefined property - skip it.
        if (!state.inputs[inputId]) continue;
        // If the input is the same as the action input
        // Check if the input is valid and assign to temp variable above.
        if (inputId === action.inputId) {
          formValid = formValid && action.valid;
        } else {
          formValid = formValid && state.inputs[inputId].valid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            valid: action.valid,
          },
        },
        formValid: formValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        formValid: action.formValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    formValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, valid, resetFalse) => {
    dispatch({ type: "INPUT_CHANGE", value: value, valid: valid, inputId: id });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({ type: "SET_DATA", inputs: inputData, formValid: formValidity });
  }, []);

  return [formState, inputHandler, setFormData];
};
