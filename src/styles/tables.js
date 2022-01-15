import styled from "styled-components";

const StyledTable = styled.table`
  /* width: ${(props) => (props.fullscreen ? "80vw" : "50vw")}; */
  border-collapse: collapse;
  table-layout: ${(props) => (props.tlayout ? "fixed" : "auto")};
  width: ${(props) => (props.tlayout ? "60%" : "80%")};
  margin: auto;
  margin-top: ${(props) => (props.tlayout ? "8rem" : "1rem")};
  padding: 2rem;
  text-align: left;
  letter-spacing: 1px;
  color: var(--cultured);
  background-color: var(--cards);
  font-family: "Open Sans", serif;
  border: 1px solid var(--card-header);

  caption {
    margin-bottom: 1rem;
  }

  thead {
    font-size: 0.9rem;
  }

  thead > tr:first-child {
    font-weight: 500;
    color: #333;
    /* border: 1px solid var(--cultured-2); */
    border-bottom: 1px solid var(--cadet-blue-crayola);
    background-color: var(--card-header);
  }

  th {
    padding: 0.8rem 0;
    /* background-color: var(--card-header); */
    /* border: 1px solid var(--cards); */
    color: var(--cultured-2);
    font-weight: 500;
    padding-left: 1.5rem;
  }

  .box-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    /* max-width: 100%; */
  }

  tr {
    border-top: 1px solid rgba(255, 255, 255, 0.15);

    &:hover .box {
      display: flex;
    }

    &:hover {
    }
  }

  td {
    padding-left: 1.5rem;
    padding-top: 1.3rem;
    padding-bottom: 1.3rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--cultured);

    .box {
      color: var(--gainsboro);
      text-align: center;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      display: none;
      justify-content: space-between;
      margin: 0 0.2rem;
    }
    .box-sep {
      color: var(--slate-gray);
    }
  }

  .target-worth-hit {
    border: 1px solid var(--background);
    background-color: var(--card-header) !important;
    border-radius: 2px;
    z-index: 1;
  }

  .target-year-hit {
    border-top: 2px solid var(--cultured) !important;
    border-bottom: 2px solid var(--cultured) !important;

    /* background-color: var(--charleston-green); */
  }

  .target-year-hit-box {
  }

  .delete-account-btn {
    border: none;
    cursor: pointer;
    text-align: center;
    color: var(--cultured-2);
    letter-spacing: 1px;
    font-weight: 400;
    font-size: 0.8rem;
    font-family: "Open Sans", serif;
    background-color: transparent;
    /* text-decoration: underline; */
  }
`;

const StyledModalTable = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  margin: auto;
  text-align: left;
  letter-spacing: 1px;
  color: var(--cultured-2);
  font-size: 0.9rem;
  font-family: "Open Sans", serif;
  font-weight: 400;

  th {
    padding: 0 1rem;
  }

  thead > tr {
    margin-top: 0.2rem;
    border-bottom: 1px solid var(--card-header);
    line-height: 2;
  }
  tr {
    th {
      padding: 0.5rem 1rem;
      padding-bottom: 0.5rem;
    }
  }

  td {
    padding: 1rem;
  }

  td > div {
    margin-top: 0;
  }
`;

export { StyledTable, StyledModalTable };
