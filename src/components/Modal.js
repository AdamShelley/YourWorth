// import React from "react";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalStylesContainer = styled.div`
  .modalContainer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba($color: #000000, $alpha: 0.35);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
      width: 30vw;
      height: auto;
      background-color: #fff;
      padding: 2rem;
      border-radius: 2px;
      color: var(--gunmetal);
      /* background-color: rgba(255, 255, 255, 0.35); */
      background-color: var(--cultured);
      backdrop-filter: blur(5px);
      box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);

      &_header {
        position: relative;
        border-bottom: 1px solid #dddddd;
        &-title {
          text-align: center;
        }

        .close {
          position: absolute;
          top: 0;
          right: 0;
          background: transparent;

          img {
            width: 1rem;
            height: auto;
            transition: all 0.3s;
          }
          &:hover {
            img {
              transform: scale(1.1);
            }
          }
        }
      }

      &_content {
        border-bottom: 1px solid #dddddd;
        padding: 2rem 0;
      }

      &_footer {
        padding: 2rem 0;
        padding-bottom: 0;

        button {
          float: right;
          padding: 0.5rem;

          border-radius: 8px;
        }
        .modal-close {
          background-color: transparent;
          font-weight: 600;

          &:hover {
            color: rgba(54, 67, 72, 0.8);
          }
        }
        .submit {
          margin-right: 1rem;
          background-color: #364348;
          color: #fff;

          &:hover {
            background-color: rgba(54, 67, 72, 0.8);
          }
        }
      }
    }
  }
`;

const Modal = ({ show, close }) => {
  const content = (
    <ModalStylesContainer>
      {show && (
        <div className="modalContainer" onClick={() => close()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal_header">
              <h2 className="modal_header-title">Modal Title</h2>
              <button className="close" onClick={() => close()}>
                X
              </button>
            </header>
            <main className="modal_content">This is modal content</main>
            <footer className="modal_footer">
              <button className="modal-close" onClick={() => close()}>
                Cancel
              </button>

              <button className="submit">Submit</button>
            </footer>
          </div>
        </div>
      )}
    </ModalStylesContainer>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

export default Modal;
