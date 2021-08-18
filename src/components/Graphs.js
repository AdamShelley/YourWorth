import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import styled from "styled-components";

const StyledGraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
  width: 100%;
`;

const Graphs = ({ data, prevAccountDataSnapshots, lastUpdated, title }) => {
  // Should export this into its own file
  const newDataArray = [];

  data.forEach((acc) => {
    if (newDataArray.some((arr) => arr.date === lastUpdated)) {
      for (let val in newDataArray) {
        if (newDataArray[val].date === lastUpdated) {
          newDataArray[val] = {
            ...newDataArray[val],
            [acc.name]: acc.amount,
          };
        }
      }
    } else {
      const tempObject = {
        date: lastUpdated,
        [acc.name]: acc.amount,
      };

      newDataArray.push(tempObject);
    }
  });

  // console.log(newDataArray);

  //  OLDER DATA to process
  const prevDataArray = [];

  prevAccountDataSnapshots.forEach((snapshot) => {
    for (const prop in snapshot) {
      const date = prop;

      const tempObj = {
        date,
      };

      snapshot[prop].forEach((snap) => {
        if (prevDataArray.some((arr) => arr.date === prop)) {
          for (const val in prevDataArray) {
            if (prevDataArray[val].date === prop) {
              prevDataArray[val] = {
                ...prevDataArray[val],
                [snap.name]: snap.amount,
              };
            }
          }
        } else {
          const building = {
            ...tempObj,
            [snap.name]: snap.amount,
          };

          prevDataArray.push(building);
        }
      });
    }

    // console.log(prevDataArray);
  });

  // Sort the data by date
  const finalData = newDataArray.concat(prevDataArray);
  finalData.sort((a, b) => (a.date > b.date ? 1 : -1));
  // console.log(finalData);

  // Convert date from object into readable dates

  return (
    <>
      <StyledGraphContainer>
        <h3>{title}</h3>
        {/* <LineChart
          width={600}
          height={300}
          data={finalData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" stroke="var(--cultured)" />
          <YAxis stroke="var(--cultured)" />
          <Tooltip
            wrapperStyle={{ backgroundColor: "var(--cultured)" }}
            labelStyle={{ color: "var(--charleston-green)" }}
            itemStyle={{ color: "var(--slate-gray)" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Vanguard"
            stroke="var(--cultured-2)"
            activeDot={{ r: 5 }}
          />
          <Line type="monotone" dataKey="Moneybox" stroke="var(--cultured)" />
          <Line type="monotone" dataKey="Nationwide" stroke="var(--cultured)" />
        </LineChart> */}
        <AreaChart
          width={600}
          height={300}
          data={finalData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="date" stroke="var(--cultured)" />
          {/* <YAxis stroke="var(--cultured)" /> */}
          <Tooltip
            wrapperStyle={{ backgroundColor: "var(--cultured)" }}
            labelStyle={{ color: "var(--charleston-green)" }}
            itemStyle={{ color: "var(--slate-gray)" }}
          />
          {/* <Legend /> */}
          <Area
            type="monotone"
            dataKey="Vanguard"
            stroke="var(--cultured-2)"
            activeDot={{ r: 5 }}
            fill="#8884d8"
            fillOpacity={0.4}
          />
          <Area
            type="monotone"
            dataKey="Moneybox"
            stroke="var(--cultured)"
            fill="#8884d8"
            fillOpacity={0.3}
          />
          <Area
            type="monotone"
            dataKey="Nationwide"
            stroke="var(--cultured)"
            fill="#8884d8"
            fillOpacity={0.2}
          />
        </AreaChart>
      </StyledGraphContainer>
    </>
  );
};

export default Graphs;
