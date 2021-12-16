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
  font-family: "Open Sans", serif;

  h3 {
    font-weight: 100;
    margin-bottom: 1rem;
    text-align: center;
  }
`;

const StyledTooltip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background-color: var(--cultured-2);
  color: var(--cards);
  padding: 1rem;
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

  console.log(finalData);

  const ToolTipContent = (
    <StyledTooltip>
      <h5>What goes here?</h5>
      {finalData.map((d) => {
        return <p>{d.account}</p>;
      })}
    </StyledTooltip>
  );

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
              stroke="var(--light-gray)"
              allowDuplicatedCategory={false}
              interval={0}
              dy={30}
              padding={{ left: 5, right: 5 }}
              tick={{ fontSize: "0.8rem" }}
              angle={-45}
              height={50}
            />

            <YAxis
              stroke="var(--light-gray)"
              label={{
                value: "Balance",
                angle: -90,
                position: "insideLeft",
                fill: "var(--light-gray)",
                dx: -20,
                dy: 30,
              }}
            />
            {/* <Tooltip
              wrapperStyle={{ backgroundColor: "var(--cultured)" }}
              labelStyle={{
                color: "var(--charleston-green)",
                fontSize: "0.9rem",
              }}
              itemStyle={{ color: "var(--slate-gray)", fontSize: "0.8rem" }}
            /> */}

            <Tooltip content={ToolTipContent} />

            {accountList.map((acc, index) => {
              return (
                <Area
                  key={`area-${index}`}
                  type="monotone"
                  dataKey={acc}
                  stroke="var(--slate-gray)"
                  activeDot={{ r: 2 }}
                  fill="var(--card-header)"
                  fillOpacity={0.45}
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
            <XAxis
              dataKey="age"
              interval={10}
              dy={5}
              height={50}
              stroke="var(--light-gray)"
            />
            <YAxis
              domain={[(dataMin) => -50000, (dataMax) => 1000000]}
              type="number"
              allowDataOverflow={true}
              stroke="var(--light-gray)"
            />

            <Tooltip
              wrapperStyle={{ backgroundColor: "var(--cultured)" }}
              labelStyle={{
                color: "var(--charleston-green)",
                fontSize: "0.9rem",
              }}
              formatter={(value, name) => [
                value.toFixed(0),
                name.toUpperCase() + " %",
              ]}
              itemStyle={{ color: "var(--slate-gray)", fontSize: "0.8rem" }}
            />
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
            <Line
              type="monotone"
              dataKey="ten"
              stroke="var(--cultured-2)"
              dot={false}
            />
          </LineChart>
        )}
      </StyledGraphContainer>
    </>
  );
};

export default Graphs;
