import React, { useState } from "react";
import useWindowDimensions from "../hooks/window-hook";
import { PieChart, Pie, ResponsiveContainer, Sector } from "recharts";

const PieChartDisplay = ({ accounts }) => {
  let animationDuration = 300;
  const [activeIndex, setActiveIndex] = useState(0);
  const { height, width } = useWindowDimensions();

  // Outline effect courtesy of Recharts Example.
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.type}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        {/* <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`PV ${value}`}</text> */}
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={5}
          textAnchor={textAnchor}
          fill="var(--cultured-2)"
        >
          {` ${payload.name}: £${payload.balance.toLocaleString(undefined, {
            minimumFactionDigits: 2,
          })} (${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    payload,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="var(--gunmetal)"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart align="center">
        <Pie
          label={width <= 768 ? renderLabel : null}
          labelLine={false}
          dataKey="balance"
          data={accounts}
          cx="50%"
          cy="50%"
          innerRadius={width <= 768 ? 0 : 100}
          stroke="var(--gunmetal)"
          fill="var(--cultured-2)"
          animationDuration={animationDuration}
          activeIndex={activeIndex}
          activeShape={width >= 768 ? renderActiveShape : null}
          onMouseEnter={onPieEnter}
          isAnimationActive={false}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartDisplay;
