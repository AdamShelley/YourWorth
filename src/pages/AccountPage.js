import React from "react";
import styled from "styled-components";
import Input from "../components/Input";

const AccountPageStyles = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  margin-top: 4rem;
`;

const AccountPage = ({ data }) => {
  console.log(data);
  const { id, ageToRetire, targetWorth, age } = data;
  return (
    <>
      <h2>Account</h2>
      <AccountPageStyles>
        <div>
          <h4>Account Details</h4>
          <Input label="Name" currentValue={id} updateVal={() => {}} />
          <Input label="Age" currentValue={age} updateVal={() => {}} />
          <Input
            label="Target Retirement Age"
            currentValue={ageToRetire}
            updateVal={() => {}}
          />
          <Input
            label="Target Retirement Goal"
            currentValue={targetWorth}
            updateVal={() => {}}
          />
        </div>
        <div>
          <h4>Control Panel</h4>
          <button>Delete ALL Data</button>
          <button>Delete Account</button>
        </div>
      </AccountPageStyles>
    </>
  );
};

export default AccountPage;
