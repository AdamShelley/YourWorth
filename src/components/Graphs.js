import React from "react";
import { XAxis, Tooltip, AreaChart, Area } from "recharts";
import styled from "styled-components";
import { standardizeData, getPrevData } from "../helpers/graphCalcs";

const StyledGraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
  width: 100%;
`;

const Graphs = ({ data, prevAccountDataSnapshots, lastUpdated, title }) => {
  // Functions to format data from Data array for Recharts
  const newData = standardizeData(data, lastUpdated);
  const prevData = getPrevData(prevAccountDataSnapshots);

  // Sort the data by date
  const finalData = newData.concat(prevData);
  finalData.sort((a, b) => (a.date > b.date ? 1 : -1));

  // Convert date from object into readable dates

  // Dynamically create account list
  const accountList = ["Vanguard", "Moneybox", "Nationwide"];

  return (
    <>
      <StyledGraphContainer>
        <h3>{title}</h3>

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
          <XAxis
            dataKey="date"
            stroke="var(--cultured)"
            allowDuplicatedCategory={false}
          />

          <Tooltip
            wrapperStyle={{ backgroundColor: "var(--cultured)" }}
            labelStyle={{ color: "var(--charleston-green)" }}
            itemStyle={{ color: "var(--slate-gray)" }}
          />

          {accountList.map((acc, index) => {
            return (
              <Area
                key={`area-${index}`}
                type="monotone"
                dataKey={acc}
                stroke="var(--cultured-2)"
                activeDot={{ r: 2 }}
                fill="#8884d8"
                fillOpacity={0.4}
                stackId={index}
              />
            );
          })}
        </AreaChart>
      </StyledGraphContainer>
    </>
  );
};

export default Graphs;
