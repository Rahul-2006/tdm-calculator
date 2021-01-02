import React from "react";
import SideBar from "./Sidebar";
import clsx from "clsx";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "column"
  },
  tdmWizard: {
    flex: "1 0 auto",
    display: "flex",
    flexDirection: "row"
  },
  aboutText: {
    maxWidth: "500px",
    minWidth: 300,
    padding: "0 2em"
  },
  scroll: {
    "&::-webkit-scrollbar": {
      webkitappearance: "none",
      width: "7px"
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "4px",
      backgroundColor: "rgba(0, 0, 0, .5)",
      webkitBoxShadow: "0 0 1px rgba(255, 255, 255, .5)"
    },
    overflowY: "scroll",
    width: "600px",
    height: "600px"
  },
  header: {
    fontFamily: "Calibri Bold",
    fontWeight: "normal",
    fontSize: "25px",
    lineHeight: "1.25em",
    color: "#0F2940",
    textAlign: "center"
  },
  bold: {
    textShadow: "1px 0 0 currentColor"
  },
  "@media (max-width: 768px)": {
    aboutText: {
      padding: "0"
    }
  },
  link: {
    textDecoration: "underline",
    fontWeight: "bold"
  },
  greyText: {
    color: "grey"
  },
  parentBullets: {
    marginLeft: "20px",
    listStyleType: "circle",
    marginBottom: "10px"
  },
  childBullets: {
    marginLeft: "20px",
    listStyleType: "circle",
    marginBottom: "10px"
  }
});

const PrivacyPolicy = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={clsx("tdm-wizard", classes.tdmWizard)}>
        <SideBar />
        <div className="tdm-wizard-content-container">
          <h1 className={classes.header}>Privacy Policy</h1>
          <br />
          <div className={(classes.aboutText, classes.scroll)}>
            <p>
              We respect your privacy, and recognize that we must maintain and
              use your information responsibly.
            </p>
            <p>
              <a
                className={classes.link}
                href="https://ladot.lacity.org/tdmcalculator"
              >
                TDM Calculator
              </a>{" "}
              is a City of Los Angeles Review Tool managed by Hack for LA which
              is a project (of Code for America Labs, Inc. (&#34;Code for
              America&#34;, &#34;we&#34;, &#34;us&#34;, &#34;our&#34;). This
              Privacy Policy describes how we collect, use, and protect your
              personal information on the TDM Calculator review tool Website. By
              submitting your personal information on our websites, you agree to
              the terms in this Privacy Policy. If you do not agree with these
              terms, please do not use our websites.
            </p>
            <h3>Overview</h3>
            <br />
            <ul>
              <li className={classes.parentBullets}>
                We allow for users to Create accounts and to save projects and
                save that information within our databases.
              </li>

              <li className={classes.parentBullets}>
                We may collect information from you when you visit and take
                actions on our website. We use this information to provide the
                services you&#39;ve requested.
              </li>

              <li className={classes.parentBullets}>
                We utilize cookies (such as those stored by Google Analytics) to
                provide a better experience and improve our review tool website
                for your use.
              </li>

              <li className={classes.parentBullets}>
                We will not knowingly disclose or sell your personal information
                to any third party, except as provided in this privacy policy.
              </li>

              <li className={classes.parentBullets}>
                Protecting your personal information is extremely important to
                us and we take all reasonable measures to do so.
              </li>
            </ul>
            <br />
            <h4>The personal information we collect</h4>
            <br />
            <p>
              Visiting{" "}
              <a
                className={classes.link}
                href="https://ladot.lacity.org/tdmcalculator"
              >
                https://ladot.lacity.org/tdmcalculator
              </a>{" "}
            </p>
            <ul>
              <li>
                We may automatically collect and store data about your visit to
                <a
                  className={classes.link}
                  href="https://ladot.lacity.org/tdmcalculator"
                >
                  https://ladot.lacity.org/tdmcalculator:
                </a>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
