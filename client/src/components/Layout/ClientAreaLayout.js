import React from "react";
import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import TermsAndConditionsModal from "../TermsAndConditions/TermsAndConditionsModal";
import ChecklistModal from "../Checklist/ChecklistModal";

import { useNavigate } from "react-router-dom";
import { Security } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import config from "../../okta.config";

const oktaAuth = new OktaAuth(config.oidc);

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
  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div className={classes.app} id="app-container" ref={appContainerRef}>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
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
      </Security>
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
