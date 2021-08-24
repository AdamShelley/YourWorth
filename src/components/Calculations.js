import React from "react";

import { StyledTable } from "../styles/tables";

// FAKE VALUES

const targetAge = 50;

const Calculations = ({ data, targetWorth }) => {
  return (
    <>
      <StyledTable fullscreen>
        <caption>Projection</caption>

        <thead>
          <tr>
            <th>Year</th>
            <th>Age</th>
            <th>Total</th>
            <th>3%</th>
            <th>5%</th>
            <th>7%</th>
            <th>10%</th>
            <th>Monthly</th>
          </tr>
        </thead>
        <tbody>
          {data.map((year, index) => {
            const targetYearHit = year.age === targetAge;

            return (
              <tr
                key={`table-number: ${index}`}
                className={targetYearHit ? "target-year-hit" : ""}
              >
                <td>{year.year}</td>
                <td>{year.age}</td>
                <td>
                  £
                  {year.total.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td
                  className={
                    year.three >= targetWorth && !targetYearHit
                      ? "target-worth-hit"
                      : targetYearHit
                      ? "target-year-hit-box"
                      : ""
                  }
                >
                  £
                  {year.three.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td
                  className={
                    year.five >= targetWorth && !targetYearHit
                      ? "target-worth-hit"
                      : targetYearHit
                      ? "target-year-hit-box"
                      : ""
                  }
                >
                  £
                  {year.five.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td
                  className={
                    year.seven >= targetWorth && !targetYearHit
                      ? "target-worth-hit"
                      : targetYearHit
                      ? "target-year-hit-box"
                      : ""
                  }
                >
                  £
                  {year.seven.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td
                  className={
                    year.ten >= targetWorth && !targetYearHit
                      ? "target-worth-hit"
                      : targetYearHit
                      ? "target-year-hit-box"
                      : ""
                  }
                >
                  £
                  {year.ten.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td>
                  £
                  {year.monthlyAdd.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <div style={{ marginBottom: "20vh" }}></div>
    </>
  );
};

export default Calculations;
