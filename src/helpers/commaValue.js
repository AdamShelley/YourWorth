export const commaValue = (value) => {
  if (value === undefined) return;
  if (value < 1000) return;

  return value.toLocaleString(undefined, { minimumFractionDigits: 2 });
};
