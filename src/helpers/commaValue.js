export const commaValue = (value) => {
  if (value < 1000) return;

  return value.toLocaleString("en-US");
};
