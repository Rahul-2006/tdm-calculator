import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import Button from "./Button/Button";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",

    zIndex: "100",
    position: "fixed",
    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px"
  },
  content: {
    padding: "50px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 5px 10px rgba(0, 46, 109, 0.2)",
    width: "47%",
    borderRadius: "5px"
  },
  title: {
    textAlign: "center"
  },
  deselectedWrapper: {
    textAlign: "center"
  },
  deselectedAlign: {
    lineHeight: "40px"
  },
  modalActions: {
    display: "flex",
    justifyContent: "center"
  }
});
const Modal = props => {
  //New props:
  // title: "Leave page and delete unsaved data?",
  // text: "This will permanently delete any unsaved projects or changes to project.",
  // icon: "test",
  // buttonOne: "Cancel",
  // buttonTwo: "Proceed",
  // nestedComponent: ""

  const { inapplicableStrategiesModal, closeStrategiesModal } = props;

  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    setModalOpen(inapplicableStrategiesModal);

    const keyDownHandler = event => {
      if (event.key === "Escape") {
        event.preventDefault();
        setModalOpen(false);
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const classes = useStyles();

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeStrategiesModal}
      contentLabel="Inapplicable Strategies"
      overlayClassName={classes.overlay}
      className={classes.content}
      shouldFocusAfterRender={false}
    >
      <div className={classes.deselectedWrapper}>
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          style={{ color: "#E46247", height: "80px" }}
          alt="Warning"
        />
        <h2 className={classes.deselectedAlign}>
          Due to changes made to the project specifications, one or more TDM
          strategies are no longer applicable and have been automatically
          de-selected
        </h2>
      </div>
      <div className={classes.modalActions}>
        <Button
          color="colorDeselect"
          id="modalProceed"
          data-testid="transitionProceed"
          onClick={closeStrategiesModal}
        >
          Okay
        </Button>
      </div>
    </Modal>
  );
};

// Modal.propTypes = {
//   inapplicableStrategiesModal: PropTypes.bool.isRequired,
//   closeStrategiesModal: PropTypes.func
// };

// Modal.propTypes = {
// title: PropTypes.string,
// text: PropTypes.string,
// icon: PropTypes.string,
// buttonOne: PropTypes.string,
// buttonTwo: PropTypes.string,
// nestedComponent: ""
// };
export default Modal;
