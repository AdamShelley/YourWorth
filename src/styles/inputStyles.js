import styled from "styled-components";

const ButtonStyled = styled.button`
  margin-top: 1rem;
  padding: 4rem 3rem;
  background-color: var(--cards);
  border: 1px solid var(--card-header);
  color: var(--cultured-2);
  letter-spacing: 1px;
  width: 70%;
  height: 6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;

  h3 {
    font-weight: 400;
    color: var(--cultured);
  }

  p {
    margin-top: 0.5rem;
    color: var(--culture-2);
    text-align: left;
    font-weight: 500;
    line-height: 1.5;
  }

  &:hover {
    border: 1px solid var(--cultured-2);
  }
`;

const SelectStyled = styled.select`
  /* margin-top: 1rem; */
  background-color: var(--cards);
  border: 1px solid var(--card-header);
  color: var(--cultured-2);
  letter-spacing: 1px;
  width: 70%;
  padding: 0 3rem;
  cursor: pointer;
  font-size: 0.9rem;

  & option {
    height: 100%;
  }

  &:hover {
    border: 1px solid var(--cultured-2);
  }
`;

export { ButtonStyled, SelectStyled };
