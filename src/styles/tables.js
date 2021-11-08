import styled from "styled-components";

const StyledTable = styled.table`
  width: ${(props) => (props.fullscreen ? "90vw" : "50vw")};
  border-collapse: collapse;
  table-layout: ${(props) => (props.tlayout ? "fixed" : "auto")};
  width: ${(props) => (props.tlayout ? "50%" : "80%")};
  margin: auto;
  margin-top: ${(props) => (props.tlayout ? "3rem" : "1rem")};
  padding: 2rem;
  text-align: left;
  letter-spacing: 1px;
  color: var(--cultured);
  /* background-color: var(--davys-grey); */
  background-color: var(--cards);
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.2);
  font-family: "Open Sans", serif;

  caption {
    margin-bottom: 1rem;
  }

  thead > tr:first-child {
    font-weight: 500;
    color: #333;
    border-bottom: 1px solid #333;
    border-top: 1px solid #333;
  }

  td,
  th {
    padding: 0.3rem 0;
  }

  th {
    /* background-color: #d4d4d4; */
    background-color: var(--card-header);
    border: 1px solid var(--card-header);
    color: var(--cultured);
    font-weight: 100;
    padding-left: 1.5rem;
  }

  .box-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    /* max-width: 100%; */
  }

  tr {
  }

  td {
    padding-left: 1.5rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    font-size: 0.8rem;

    .box {
      background-color: var(--cultured-2);
      border-radius: 2px;
      width: 25px;
      height: 25px;
      color: var(--gunmetal);
      text-align: center;

      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin: 0.2rem;

      i {
        font-size: 0.9rem;
        text-align: center;
      }

      &:hover {
        background-color: var(--slate-gray);
        color: var(--cultured);
        transition: all 0.1s ease;
      }
    }

    .delete-account-btn {
      border: none;
      height: 25px;
      width: 70px;
      border-radius: 2px;
      cursor: pointer;

      &:hover {
        background-color: var(--slate-gray);
        color: var(--cultured);
        transition: all 0.1s ease;
      }
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
`;

export { StyledTable };
