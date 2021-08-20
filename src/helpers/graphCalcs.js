const standardizeData = (data, snapShotDate) => {
  // Should export this into its own file
  const newDataArray = [];

  // Loop through the data passed via props

  data.forEach((acc) => {
    // If the array is empty, add the first part of the data
    if (newDataArray.length === 0) {
      const temp = {
        date: snapShotDate,
        [acc.name]: acc.amount,
      };
      newDataArray.push(temp);
    }

    newDataArray[0] = {
      ...newDataArray[0],
      [acc.name]: acc.amount,
    };
  });

  return newDataArray;
};

const getPrevData = (data) => {
  const prevDataArray = [];

  data.forEach((item) => {
    Object.keys(item).forEach((account) => {
      const key = item[account];

      let temp = {
        date: account,
      };

      key.forEach((acc) => {
        temp = {
          ...temp,
          [acc.name]: acc.amount,
        };
      });
      prevDataArray.push(temp);
    });
  });
  return prevDataArray;
};

export { standardizeData, getPrevData };
