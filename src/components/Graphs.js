import React from "react";
import {
  XAxis,
  Tooltip,
  AreaChart,
  Area,
  LineChart,
  YAxis,
  Legend,
  Line,
  ReferenceLine,
} from "recharts";
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

const Graphs = ({
  data,
  prevAccountDataSnapshots,
  lastUpdated,
  title,
  projected,
  targetWorth,
  accountList,
}) => {
  // Functions to format data from Data array for Recharts

  const lastUpdate = lastUpdated.split("T")[0];

  const newData = standardizeData(data, lastUpdate);
  const prevData = getPrevData(prevAccountDataSnapshots);

  // Sort the data by date
  const finalData = newData.concat(prevData);
  finalData.sort((a, b) => (a.date > b.date ? 1 : -1));

  return (
    <>
      <StyledGraphContainer>
        <h3>{title}</h3>

        {!projected ? (
          <AreaChart
            width={600}
            height={300}
            data={finalData}
            margin={{
              top: 5,
              right: 30,
              left: 50,
              bottom: 20,
            }}
          >
            <XAxis
              dataKey="date"
              stroke="var(--cultured)"
              allowDuplicatedCategory={false}
              interval={0}
              dy={20}
              padding={{ left: 5, right: 5 }}
              tick={{ fontSize: "0.8rem" }}
              angle={-45}
              height={50}
            />
            <YAxis />

            <Tooltip
              wrapperStyle={{ backgroundColor: "var(--cultured)" }}
              labelStyle={{
                color: "var(--charleston-green)",
                fontSize: "0.9rem",
              }}
              itemStyle={{ color: "var(--slate-gray)", fontSize: "0.8rem" }}
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
        ) : (
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 50,
              bottom: 20,
            }}
          >
            <XAxis dataKey="age" interval={10} dy={5} height={50} />
            <YAxis
              domain={[(dataMin) => -100000, (dataMax) => 2000000]}
              type="number"
              allowDataOverflow={true}
            />
            <Tooltip />
            <Legend verticalAlign={"bottom"} margin={{ top: "1rem" }} />
            <ReferenceLine y={0} stroke="red" />
            <ReferenceLine y={targetWorth} stroke="green" />
            <Line
              type="monotone"
              dataKey="three"
              stroke="var(--cultured)"
              activeDot={{ r: 2 }}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="five"
              stroke="var(--cultured-2)"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="seven"
              stroke="var(--light-gray)"
              dot={false}
            />
            <Line type="monotone" dataKey="ten" stroke="#82ca9d" dot={false} />
          </LineChart>
        )}
      </StyledGraphContainer>
    </>
  );
};

export default Graphs;
