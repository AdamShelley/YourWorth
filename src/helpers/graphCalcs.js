const standardizeData = (data, lastUpdated) => {
  const newDataArray = [];

  console.log(lastUpdated);
  // Formatted date
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(lastUpdated).toLocaleString("en-US");

  console.log(formattedDate);

  // Loop through the data passed via props
  data.forEach((acc) => {
    // If the array is empty, add the first part of the data
    if (newDataArray.length === 0) {
      const temp = {
        date: lastUpdated,
        [acc.name]: acc.balance,
      };

      newDataArray.push(temp);
    }

    // Add the rest of the accounts to the latest date
    newDataArray[0] = {
      ...newDataArray[0],
      [acc.name]: acc.balance,
    };
  });

  return newDataArray;
};

const getPrevData = (data) => {
  // console.log(data);
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
