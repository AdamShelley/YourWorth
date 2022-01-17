const standardizeData = (data, lastUpdated) => {
  const newDataArray = [];

  // Formatted date
  // const options = { year: "numeric", month: "long", day: "numeric" };
  // const formattedDate = new Date(lastUpdated).toLocaleString("en-US");

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
      console.log(account);

      const key = item[account];

      const month = new Date(account).toLocaleString("en-us", {
        month: "short",
      });

      const display = `${account.split("-")[2]}-${month}`;

      let temp = {
        date: account,
        displayDate: display,
      };

      key.forEach((acc) => {
        temp = {
          ...temp,
          [acc.name]: acc.balance,
        };
      });
      prevDataArray.push(temp);
    });
  });
  return prevDataArray;
};

export { standardizeData, getPrevData };
