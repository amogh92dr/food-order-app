import React from "react";
import classes from "./Modal.module.css";
import ReactDOM from "react-dom";
const BackDrop = (props) => {
  const hideCartHandler = () => {
    props.hideCart();
  };
  return <div className={classes.backdrop} onClick={hideCartHandler} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("modal");

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop hideCart={props.hideCart} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};
export default Modal;
