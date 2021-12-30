import React from "react";
import styled from "styled-components";

import { ReactComponent as FinancePicture } from "../images/finance.svg";
import { ReactComponent as FinancePicture2 } from "../images/finance-2.svg";
import { ReactComponent as FinancePicture3 } from "../images/finance-3.svg";
import { Link } from "react-router-dom";

const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 2.5rem;
    font-weight: 400;
    margin-top: 5rem;
    letter-spacing: 1px;
  }

  section {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-family: "Open Sans", serif;
    height: 25rem;

    svg {
      max-width: 25%;
    }

    div {
      padding: 2rem;
      width: 40%;
      padding: 1rem;

      h3 {
        color: var(--cultured-2);
        font-weight: 400;
      }

      p {
        font-size: 0.9rem;
        font-weight: 400;
        padding: 0.5rem 0;
        color: var(--light-gray);
      }
    }
  }

  section:nth-child(3) {
    height: 40rem;
    background-color: var(--cards);
    clip-path: polygon(0 0, 100% 20%, 100% 80%, 0 100%);
  }
`;

const HeroButton = styled.button`
  background-color: var(--cards);
  border: 1px solid var(--card-header);
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  margin: 5rem;

  &:hover {
    border: 1px solid var(--cultured-2);
  }

  a {
    text-decoration: none;
    color: var(--cultured-2);
  }
`;

const SplashPage = () => {
  return (
    <SplashContainer>
      <h1>Your new financial tracker </h1>
      <section>
        <FinancePicture />
        <div>
          <h3>Track your portfolio</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In cum
            voluptatibus, corporis iure odio nobis fugiat voluptatem facilis quo
            id.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In cum
            voluptatibus, corporis iure odio nobis fugiat voluptatem facilis quo
            id.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In cum
            voluptatibus, corporis iure odio nobis fugiat voluptatem facilis quo
            id.
          </p>
        </div>
      </section>
      <section>
        <div>
          <h3>Calculate your future potential</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In cum
            voluptatibus, corporis iure odio nobis fugiat voluptatem facilis quo
            id.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In cum
            voluptatibus, corporis iure odio nobis fugiat voluptatem facilis quo
            id.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In cum
            voluptatibus, corporis iure odio nobis fugiat voluptatem facilis quo
            id.
          </p>
        </div>
        <FinancePicture2 />
      </section>
      <section>
        <FinancePicture3 />
        <div>
          <h3>Calculate your future potential</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In cum
            voluptatibus, corporis iure odio nobis fugiat voluptatem facilis quo
            id.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In cum
            voluptatibus, corporis iure odio nobis fugiat voluptatem facilis quo
            id.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In cum
            voluptatibus, corporis iure odio nobis fugiat voluptatem facilis quo
            id.
          </p>
        </div>
      </section>

      {/* <HeroButton>Join now!</HeroButton> */}
      <Link path="/signup">Join now!</Link>
    </SplashContainer>
  );
};

export default SplashPage;
