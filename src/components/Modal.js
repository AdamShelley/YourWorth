// import React from "react";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { ButtonStyled } from "../styles/inputStyles";

const ModalStylesContainer = styled.div`
  .modalContainer {
    position: fixed;
    top: -10%;
    bottom: 0;
    left: 0;
    right: 0;
    /* background-color: rgba($color: #000000, $alpha: 0.35); */
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Open Sans", serif;

    .modal {
      width: ${({ modalSize }) => handleSize(modalSize)};
      height: auto;
      background-color: #fff;
      padding: 2rem;
      border-radius: 2px;
      backdrop-filter: blur(5px);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
      background-color: var(--background);
      border: 1px solid var(--cards);

      &_header {
        position: relative;
        /* border-bottom: 1px solid var(--slate-gray); */
        padding: 0.5rem 0;

        &-title {
          font-size: 1.2rem;
          text-align: left;
          /* margin-bottom: 1rem; */
          font-weight: 100;
          line-height: 1.8;
        }
      }

      &_content {
        margin-top: 1rem;
        border-bottom: 1px solid var(--slate-gray);
        /* padding: 1rem; */
        padding-bottom: 3rem;
        font-family: "Open Sans", serif;

        color: var(--gunmetal);

        /* & label {
          color: var(--gunmetal);
        } */

        p {
          margin-top: 2rem;
          color: var(--cultured-2);
          font-family: "Open Sans", serif;
          font-size: 0.9rem;
          font-weight: 300;
        }

        & input {
          font-weight: 100;
        }
      }

      &_footer {
        padding: 1rem 0;
        padding-bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
          margin: 1rem;
          padding: 1rem;
          cursor: pointer;
          border-radius: 2px;
          font-family: "Open Sans", serif;
          width: 50%;
          height: 3rem;
          display: flex;
          align-items: center;
        }

        .modal-close {
          /* border: 1px solid var(--slate-gray); */
          background-color: var(--background);
          /* color: var(--slate-gray); */
          border-radius: 2px;
          transition: all 0.1s ease-in;

          &:hover {
            color: var(--cultured-2);
            border: 1px solid var(--cultured-2);
          }
        }
        .submit {
          /* border: 1px solid var(--slate-gray); */
          /* background-color: var(--card-header); */
          /* color: var(--cultured); */

          &:hover {
            background-color: rgba(54, 67, 72, 0.8);
          }
        }
      }
    }
  }
`;

const handleSize = (size) => {
  switch (size) {
    case "large":
      return "50vw";
    case "medium":
      return "30vw";
    case "small":
      return "30vw";
    default:
      return "30vw";
  }
};

const Modal = (props) => {
  const { show, close, title, submitHandler, modalSize } = props;

  const content = (
    <ModalStylesContainer modalSize={modalSize}>
      {show && (
        <div className="modalContainer" onClick={() => close()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal_header">
              <h2 className="modal_header-title">{title}</h2>
            </header>
            <main className="modal_content">{props.children}</main>
            <footer className="modal_footer">
              <ButtonStyled className="submit" onClick={submitHandler}>
                Submit
              </ButtonStyled>
              <ButtonStyled className="modal-close" onClick={() => close()}>
                Cancel
              </ButtonStyled>
            </footer>
          </div>
        </div>
      )}
    </ModalStylesContainer>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

export default Modal;
