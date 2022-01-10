import { useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
//import "./modal.css"

const ModalArticle = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #0000002e;
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 999;

  ${({ isOpen }) =>
    isOpen &&
    css`
      display: flex;
    `}
`;
const Modal = ({ children, isOpen, closeModal }) => {
  const handleModalContainerClic = (e) => e.stopPropagation();

  return ReactDOM.createPortal(
    <ModalArticle isOpen={isOpen} onClick={() => closeModal()}>
      <div className="modal-container" onClick={handleModalContainerClic}>
        {children}
      </div>
    </ModalArticle>,
    document.getElementById("modal")
  );
};
export default Modal;

/* const Modal = ({ children, isOpen, closeModal }) => {
    const portalNode = document.createElement("div");
    const handleModalContainerClic = (e) => e.stopPropagation();

    useEffect( () => {
        document.body.appendChild(portalNode);

        return () => {
            portalNode.remove()
        }
    }, [])
    
    return ReactDOM.createPortal(
        <ModalArticle isOpen={isOpen} onClick={ () => closeModal()}>
            <div className="modal-container" onClick={handleModalContainerClic}>
                {children}  
            </div>
        </ModalArticle>
        , portalNode)
}
export default Modal; */
