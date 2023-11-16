import React, { useState } from "react";
import ReactDOM from 'react-dom';
import style from "./Modal.module.css";

const Modal = ({ children, isModalClosed, closeModal }) => {
  return ReactDOM.createPortal(
    <div
      onClick={closeModal}
      className={`${style.modal} ${isModalClosed ? style.closed : ""}`}
    >
      <div onClick={(e) => e.stopPropagation()} className={style.modal_content}>
        {children}
      </div>
    </div>,

    document.getElementById("modal") // The portal target element
  );
};

export default Modal;

export const useModal = () => {
  const [isModalClosed, setIsModalClosed] = useState(true);

  const closeModal = () => {
    setIsModalClosed(true);
  };

  const openModal = () => {
    setIsModalClosed(false);
  };

  return { isModalClosed, closeModal, openModal };
};
