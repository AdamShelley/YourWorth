import styled from "styled-components";

const StyledTable = styled.table`
  width: ${(props) => (props.fullscreen ? "80vw" : "50vw")};
  border-collapse: collapse;
  table-layout: ${(props) => (props.tlayout ? "fixed" : "auto")};
  width: ${(props) => (props.tlayout ? "50%" : "80%")};
  margin: auto;
  margin-top: ${(props) => (props.tlayout ? "5rem" : "1rem")};
  padding: 2rem;
  text-align: left;
  letter-spacing: 1px;
  color: var(--cultured);
  /* background-color: var(--davys-grey); */
  background-color: var(--cards);
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.2);
  font-family: "Open Sans", serif;
  border-radius: 5px;

  caption {
    margin-bottom: 1rem;
  }

  thead {
    font-size: 0.8rem;
    font-weight: 400;
    text-transform: uppercase;
  }

  thead > tr:first-child {
    font-weight: 500;
    color: #333;
    border-bottom: 1px solid #333;
    border-top: 1px solid #333;
  }

  th {
    padding: 0.6rem 0;
  }

  th {
    /* background-color: #d4d4d4; */
    background-color: var(--card-header);
    border: 1px solid var(--card-header);
    color: var(--cultured);
    font-weight: 300;
    padding-left: 1.5rem;
  }

  .box-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    /* max-width: 100%; */
  }

  tr {
    border-top: 1px solid rgba(255, 255, 255, 0.2);

    &:hover .box {
      display: flex;
    }

    &:hover {
    }
  }

  td {
    padding-left: 1.5rem;
    padding-top: 1.2rem;
    padding-bottom: 1.2rem;
    font-size: 0.8rem;

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
    border: 1px solid black;
    background-color: green !important;
    border-radius: 2px;
    z-index: 1;
  }
  .target-year-hit {
    border: 2px solid var(--cultured) !important;
    z-index: 999;

    background-color: var(--slate-gray);
  }

  .target-year-hit-box {
    border-top: 2px solid var(--cultured) !important;
    border-bottom: 2px solid var(--cultured) !important;
  }

  .delete-account-btn {
    border: none;
    cursor: pointer;
    text-align: center;
    color: var(--gainsboro);
    background-color: transparent;
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
    border-bottom: 1px solid var(--cultured-2);
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
