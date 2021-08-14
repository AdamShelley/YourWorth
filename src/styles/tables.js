import styled from "styled-components";

const StyledTable = styled.table`
  width: 50vw;
  border-collapse: collapse;
  margin-top: 6rem;
  padding: 2rem;
  text-align: left;
  letter-spacing: 1px;
  color: var(--cultured);

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
    background-color: #d4d4d4;
    padding-left: 1rem;
  }

  .box-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  td {
    padding-left: 1rem;

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
  }
`;

export { StyledTable };
