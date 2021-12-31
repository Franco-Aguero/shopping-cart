import ReactDOM from 'react-dom';
import "./modal.css"

const Modal = ({ children, isOpen, closeModal }) => {
    const handleModalContainerClic = (e) => e.stopPropagation()
    
    return ReactDOM.createPortal(
        <article className={`modal ${isOpen?"is-open":"is-close"}`} onClick={ () => closeModal()}>
            <div className="modal-container" onClick={handleModalContainerClic}>
                {children}  
            </div>
        </article>,
        document.getElementById("modal")
    )
}
export default Modal;