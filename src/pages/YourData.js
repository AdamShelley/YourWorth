import React from "react";
import styled from "styled-components";

const StyledDataPage = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 100vh;
  width: 50vw;
  font-family: "Open Sans", serif;

  h3 {
    font-weight: 400;
    font-size: 1.2rem;
  }

  h5 {
    font-weight: 500;
    font-size: 1rem;
    margin-top: 2rem;
  }

  p {
    font-size: 0.9rem;
    margin-top: 1rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: justify;
  }
`;

const YourData = () => {
  return (
    <StyledDataPage>
      <h3>How is your data handled?</h3>

      <h5>Database</h5>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit non
        beatae illum amet et sit nisi, cumque ad consequatur est reprehenderit
        ea, nobis autem, suscipit laboriosam accusantium totam optio possimus?
        Eos perferendis dolore dolorum corrupti amet sint, blanditiis eaque,
        perspiciatis atque deleniti sed assumenda harum sit. Maiores possimus
        odio quis.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quam
        est tempore neque dignissimos cumque commodi vero similique! Saepe eos
        quidem officia sunt quo in natus veritatis aliquid. Aliquam illum, sint
        aut laudantium beatae non pariatur. Excepturi, obcaecati facilis! Nihil
        perspiciatis vero vitae fugit velit eveniet veritatis ut saepe
        aspernatur!
      </p>
      <h5>Cookies</h5>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quam
        est tempore neque dignissimos cumque commodi vero similique! Saepe eos
        quidem officia sunt quo in natus veritatis aliquid. Aliquam illum, sint
        aut laudantium beatae non pariatur. Excepturi, obcaecati facilis! Nihil
        perspiciatis vero vitae fugit velit eveniet veritatis ut saepe
        aspernatur!
      </p>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad voluptatem
        nostrum ullam labore voluptatum atque distinctio, magni praesentium
        ratione! Laborum hic rerum nihil tempore adipisci, commodi, dolorem
        aspernatur mollitia cumque iure veritatis nam neque eius ipsa,
        accusantium incidunt nesciunt repudiandae. Quis dicta porro dolorem?
        Cupiditate vero dolores impedit cumque modi!
      </p>
    </StyledDataPage>
  );
};

export default YourData;
