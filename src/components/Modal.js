// import React from "react";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalStylesContainer = styled.div`
  .modalContainer {
    position: fixed;
    top: -30%;
    bottom: 0;
    left: 0;
    right: 0;
    /* background-color: rgba($color: #000000, $alpha: 0.35); */
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
      width: ${({ modalSize }) => handleSize(modalSize)};
      height: auto;
      background-color: #fff;
      padding: 2rem;
      border-radius: 2px;
      /* color: var(--gunmetal); */
      /* background-color: rgba(255, 255, 255, 0.35); */
      /* background-color: var(--cultured); */

      backdrop-filter: blur(5px);
      box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.5);

      // Testing dark
      /* background-color: var(--cards); */
      background-color: var(--background);
      border: 1px solid var(--cards);

      &_header {
        position: relative;
        border-bottom: 1px solid var(--slate-gray);
        padding: 0.5rem 1rem;

        &-title {
          font-size: 1.2rem;
          text-transform: lowercase;
          text-align: left;
          margin-bottom: 1rem;
          font-weight: 100;
          line-height: 1.8;
        }
      }

      &_content {
        border-bottom: 1px solid var(--slate-gray);
        padding: 1rem;
        padding-bottom: 3rem;

        color: var(--gunmetal);

        /* & label {
          color: var(--gunmetal);
        } */

        & input {
          font-weight: 100;
        }
      }

      &_footer {
        padding: 2rem 0;
        padding-bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        button {
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 2px;
        }
        .modal-close {
          font-weight: 300;
          border: 1px solid var(--slate-gray);
          background-color: var(--cultured);
          color: var(--slate-gray);
          border-radius: 2px;
          transition: all 0.1s ease-in;

          &:hover {
            color: var(--charleston-green);
            border: 1px solid var(--charleston-green);
          }
        }
        .submit {
          margin-right: 1rem;
          border: 1px solid var(--slate-gray);
          background-color: var(--card-header);
          color: var(--cultured);

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
      return "40vw";
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
              <button className="submit" onClick={submitHandler}>
                Submit
              </button>
              <button className="modal-close" onClick={() => close()}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </ModalStylesContainer>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

export default Modal;
