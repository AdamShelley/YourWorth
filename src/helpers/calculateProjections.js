const calculateProjections = (dataSet, monthlyIncrease) => {
  const { netWorth, ageToRetire, drawDownAmount } = dataSet;

  const totalProjections = [];

  let monthlyAdd = parseFloat(monthlyIncrease);

  // How many years to calculate in advance
  const yearsToCalculate = 100 - dataSet.age + 1;

  // yearly drawDown
  const estimatedInflation = 1.025;
  let drawDownYearly = drawDownAmount * 12;
  let drawDownMonthly;
  let three = netWorth;
  let five = netWorth;
  let seven = netWorth;
  let ten = netWorth;
  let total = netWorth + monthlyAdd;
  let yearlyInput = monthlyAdd * 12;

  // For each year from current age to 100
  for (let i = 1; i <= yearsToCalculate - 1; i++) {
    let year = i;
    let age = dataSet.age + i;

    // When the age hits the selected retirement age
    if (age >= ageToRetire) {
      // For the first year of retirement
      if (age === ageToRetire) {
        drawDownMonthly = (drawDownYearly / 12).toFixed(2);
        monthlyAdd = 0;
        yearlyInput = 0;
        // For all other years of retirement
      } else {
        monthlyAdd = 0;
        yearlyInput = 0;
        drawDownYearly *= estimatedInflation;
        drawDownMonthly = (drawDownYearly / 12).toFixed(2);
      }
    }

    // While the age is not at retirement
    if (age < ageToRetire) {
      // Still need to round these numbers to 2 decimal places
      three *= 1.03;
      five *= 1.05;
      seven *= 1.07;
      ten *= 1.1;

      if (i > 1) {
        three += yearlyInput;
        five += yearlyInput;
        seven += yearlyInput;
        ten += yearlyInput;
        monthlyAdd *= 1.02;
      }

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

      // total -= drawDownYearly;
    }

    const temp = {
      year,
      age,
      three: parseFloat(three.toFixed(2)),
      five: parseFloat(five.toFixed(2)),
      seven: parseFloat(seven.toFixed(2)),
      ten: parseFloat(ten.toFixed(2)),
      monthlyAdd: parseFloat(monthlyAdd.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      drawDownMonthly,
    };

    totalProjections.push(temp);
  }

  return totalProjections;
};

export { calculateProjections };
