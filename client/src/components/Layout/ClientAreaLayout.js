import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import TermsAndConditionsModal from "../TermsAndConditions/TermsAndConditionsModal";
import ChecklistModal from "../Checklist/ChecklistModal";

import Auth0ProviderWithNavigate from "../../Auth0ProviderWithNavigate";

const useStyles = createUseStyles({
  app: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column"
  }
});

const ClientAreaLayout = ({
  appContainerRef,
  hasAcceptedTerms,
  onAcceptTerms,
  checklistModalOpen,
  toggleChecklistModal
}) => {
  const classes = useStyles();

  return (
    <div className={classes.app} id="app-container" ref={appContainerRef}>
      <Auth0ProviderWithNavigate>
        <TermsAndConditionsModal
          hasAcceptedTerms={hasAcceptedTerms}
          onAcceptTerms={onAcceptTerms}
        />
        <ChecklistModal
          checklistModalOpen={checklistModalOpen}
          toggleChecklistModal={toggleChecklistModal}
        />
        <Header />

        <Outlet />
        <Footer toggleChecklistModal={toggleChecklistModal} />
      </Auth0ProviderWithNavigate>
    </div>
  );
};

ClientAreaLayout.propTypes = {
  appContainerRef: PropTypes.any,
  hasAcceptedTerms: PropTypes.bool,
  onAcceptTerms: PropTypes.func,
  checklistModalOpen: PropTypes.bool,
  toggleChecklistModal: PropTypes.func
};

export default ClientAreaLayout;
