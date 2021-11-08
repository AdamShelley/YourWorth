const calculateProjections = (loadedUser, monthlyIncrease) => {
  console.log(loadedUser);
  const { netWorth, ageToRetire, drawDownAmount } = loadedUser;

  const totalProjections = [];

  //   Yearly increase assumption (2%);

  let monthlyAdd = parseFloat(monthlyIncrease);

  // How many years to calculate in advance
  const yearsToCalculate = 100 - loadedUser.age + 1;
  // const targetYear = Number(targetWorthDateHit.split("-")[0].slice(2, 4));

  // yearly drawDown
  let drawDownYearly = drawDownAmount * 12;
  const estimatedInflation = 1.025;

  let three = netWorth;
  let five = netWorth;
  let seven = netWorth;
  let ten = netWorth;

  let total = netWorth + monthlyAdd;
  let yearlyInput = monthlyAdd * 12;

  for (let i = 1; i <= yearsToCalculate - 1; i++) {
    let year = i;
    let age = loadedUser.age + i;

    if (age >= ageToRetire) {
      monthlyAdd = 0;
      yearlyInput = 0;
    }

    if (age < ageToRetire) {
      // Still need to round these numbers to 2 decimal places
      three *= 1.03;
      five *= 1.05;
      seven *= 1.07;
      ten *= 1.1;

      // if (i > 1) {
      three += yearlyInput;
      five += yearlyInput;
      seven += yearlyInput;
      ten += yearlyInput;
      monthlyAdd *= 1.02;
      // }

      total += yearlyInput;
    } else {
      three *= 1.03;
      five *= 1.05;
      seven *= 1.07;
      ten *= 1.1;

      three -= drawDownYearly;
      five -= drawDownYearly;
      seven -= drawDownYearly;
      ten -= drawDownYearly;

      drawDownYearly *= estimatedInflation;
      total -= drawDownYearly;
    }

    const temp = {
      year,
      age,
      three,
      five,
      seven,
      ten,
      monthlyAdd,
      total,
    };

    totalProjections.push(temp);
  }

  //   console.log(totalProjections);

  // 3%, 5%, 7%, 10% increases
  // Take into account Monthly inflation
  return totalProjections;
};

export { calculateProjections };
