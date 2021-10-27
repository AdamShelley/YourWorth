const REQUIRED = "REQUIRED";
const FILE = "FILE";
const EMAIL = "EMAIL";
const MIN_LENGTH = "MIN_LENGTH";
const MAX_LENGTH = "MAX_LENGTH";
const MIN = "MIN";
const MAX = "MAX";

export const requiredValidator = () => ({ type: REQUIRED });
export const fileValidator = () => ({ type: FILE });
export const emailValidator = () => ({ type: EMAIL });
export const minLengthValidator = (value) => ({ type: MIN_LENGTH, value });
export const maxLengthValidator = (value) => ({ type: MAX_LENGTH, value });
export const minValidator = (value) => ({ type: MIN, value });
export const maxValidator = (value) => ({ type: MAX, value });

export const validate = (input, validators) => {
  const inputLength = input.trim().length;
  const emailPattern = /^\S+@\S+\.\S+$/.test(input);

  return validators.every(
    ({ type, value }) =>
      (type === REQUIRED && inputLength > 0) ||
      (type === MIN_LENGTH && inputLength >= value) ||
      (type === EMAIL && emailPattern) ||
      (type === MAX_LENGTH && inputLength <= value) ||
      (type === MIN && +input >= value) ||
      (type === MAX && +input <= value)
  );
};
