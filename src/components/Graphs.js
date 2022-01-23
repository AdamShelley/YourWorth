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
  Label,
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
    margin-bottom: 3rem;
  }
`;

const StyledTooltip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;

  /* background-color: var(--cultured-2); */
  background-color: var(--cards);
  /* color: var(--cards); */
  color: var(--cultured-2);
  border: 1px solid var(--slate-gray);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 10px;

  div {
    display: flex;
    justify-content: space-between;
  }

  h5 {
    font-size: 1rem;
    font-weight: 400;
    margin: 0.2rem;
  }

  p {
    font-size: 0.8rem;
    margin: 0.2rem !important;
    font-weight: 800;
    color: var(--cultured-2);
  }

  p:first-child {
    padding-right: 2rem;
  }
`;

const Graphs = ({
  data,
  prevAccountDataSnapshots,
  lastUpdated,
  title,
  projected,
  targetWorth,
  accountList,
  currency,
}) => {
  // Functions to format data from Data array for Recharts

  const lastUpdate = lastUpdated.split("T")[0];

  // const newData = standardizeData(data, lastUpdate);
  const prevData = getPrevData(prevAccountDataSnapshots);

  // Sort the data by date
  // const finalData = newData.concat(prevData);
  // finalData.sort((a, b) => (a.date > b.date ? 1 : -1));
  prevData.sort((a, b) => (a.date > b.date ? 1 : -1));

  // console.log(newData);

  const ToolTipContent = ({ active, payload, label, netWorth }) => {
    if (active && payload) {
      if (netWorth) {
        const formatDate = label.split("-");
        const month = new Date(label).toLocaleString("en-us", {
          month: "short",
        });

        const newDate = `${month} ${formatDate[0]}`;

        const keys = Object.entries(payload[0]?.payload);

        return (
          <StyledTooltip>
            <h5>{newDate}</h5>
            {keys.map((ob) => {
              if (ob[0] !== "date" && ob[0] !== "displayDate") {
                return (
                  <div key={ob[1]}>
                    <p>{ob[0]}:</p>
                    <p>{ob[1].toLocaleString()}</p>
                  </div>
                );
              }
            })}
          </StyledTooltip>
        );
      } else {
        const keys = Object.entries(payload[0]?.payload);

        return (
          <StyledTooltip>
            <h5>Projection</h5>
            {/* Add formatted % data */}
            {keys.map((ob) => {
              if (ob[0] === "total") {
                return null;
              } else {
                // Formatting data
                if (ob[0] === "year") ob[0] = "Year";
                if (ob[0] === "age") ob[0] = "Age";
                if (ob[0] === "three") ob[0] = "3%";
                if (ob[0] === "five") ob[0] = "5%";
                if (ob[0] === "seven") ob[0] = "7%";
                if (ob[0] === "ten") ob[0] = "10%";
                if (ob[0] === "monthlyAdd") ob[0] = "Monthly Increase";
                if (ob[0] === "drawDownMonthly") ob[0] = "Monthly Drawdown";

                return (
                  <div key={ob[1]}>
                    <p>{ob[0]}:</p>
                    <p>{ob[1]}</p>
                  </div>
                );
              }
            })}
          </StyledTooltip>
        );
      }
    }

    return null;
  };

  console.log(currency);

  return (
    <>
      <StyledGraphContainer>
        <h3>{title}</h3>
        {!projected ? (
          <AreaChart
            width={600}
            height={300}
            data={prevData}
            margin={{
              top: 5,
              right: 30,
              left: 50,
              bottom: 20,
            }}
          >
            <defs>
              <linearGradient id="value" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--gunmetal)"
                  stopOpacity={0.5}
                />
                <stop offset="100%" stopColor="var(--cards)" stopOpacity={1} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="displayDate"
              stroke="var(--light-gray)"
              allowDuplicatedCategory={false}
              interval={1}
              dy={10}
              padding={{ left: 5, right: 5 }}
              tick={{ fontSize: "0.8rem", fontWeight: "800" }}
              height={50}
            />

            <YAxis
              stroke="var(--light-gray)"
              tickFormatter={(tick) => {
                return `${tick}`;
              }}
            />

            <Tooltip
              content={ToolTipContent}
              cursor={false}
              netWorth
              offset={100}
            />

            {accountList.map((acc, index) => {
              return (
                <Area
                  key={`area-${index}`}
                  type="monotone"
                  dataKey={acc}
                  stroke="var(--light-gray)"
                  strokeWidth={3}
                  activeDot={{ r: 3 }}
                  fill="url(#value)"
                  fillOpacity={1}
                  stackId={1}
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
              tick={{ fontSize: "0.8rem", fontWeight: "800" }}
            />
            <YAxis
              domain={[-100000, 2000000]}
              type="number"
              allowDataOverflow={true}
              stroke="var(--light-gray)"
            />

            <Tooltip
              content={ToolTipContent}
              cursor={false}
              projected
              offset={50}
              allowEscapeViewBox={{ y: true }}
            />

            <Legend
              verticalAlign={"bottom"}
              iconSize={10}
              iconType="triangle"
              margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
            />

            <ReferenceLine y={0} stroke="red" strokeWidth={2}>
              <Label fill="var(--cultured-2)" position="insideBottomRight">
                {currency + " 0"}
              </Label>
            </ReferenceLine>
            <ReferenceLine y={targetWorth} stroke="green" strokeWidth={2}>
              <Label fill="var(--cultured-2)" position="insideBottomRight">
                {currency + " " + targetWorth}
              </Label>
            </ReferenceLine>
            <Line
              type="monotone"
              dataKey="three"
              // stroke="var(--cultured)"
              stroke="yellow"
              strokeWidth={2}
              activeDot={{ r: 2 }}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="five"
              stroke="var(--cultured)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="seven"
              // stroke="var(--cultured)"
              stroke="lightblue"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="ten"
              // stroke="var(--cultured)"
              stroke="lightgreen"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        )}
      </StyledGraphContainer>
    </>
  );
};

export default Graphs;
