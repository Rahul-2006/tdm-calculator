import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { createUseStyles } from "react-jss";
import { NavLink } from "react-router-dom";
// import NavBarLogin from "./NavBarLogin";
import PropTypes from "prop-types";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Okta/LoginButton";
import LogoutButton from "../Okta/LogoutButton";

const useStyles = createUseStyles({
  navbar: {
    flexGrow: "1",
    flexShrink: "0",
    flexBasis: "content",
    margin: "0 0 0 2em",
    padding: "0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    listStyleType: "none",
    "@media print": {
      display: "none"
    },
    "@media (max-width:900px)": {
      marginLeft: "1em"
    },
    "@media (max-width:768px)": {
      marginLeft: 0
    }
  },
  link: {
    color: "#ffffff",
    textDecoration: "none",
    marginRight: "2em",
    "&:hover": {
      color: "#a7c539"
    },
    "@media (max-width:900px)": {
      marginRight: "1em"
    }
  },
  currentLink: {
    borderBottom: "2px solid #a7c539"
  },
  linkUnclickable: {
    color: "rgba(255, 255, 255, 0.5)",
    textDecoration: "none",
    marginRight: "2em",
    pointer: "none",
    cursor: "default",
    "@media (max-width:900px)": {
      marginRight: "1em"
    }
  },
  linkBlock: {
    "@media (max-width:768px)": {
      borderTop: "2px solid #0f2940",
      width: "100%",
      paddingTop: ".5em",
      paddingBottom: ".5em",
      display: "flex",
      justifyContent: "center",
      "&:last-child": {
        borderBottom: "2px solid #0f2940"
      }
    }
  },
  userLogin: {
    marginLeft: "auto",
    color: "white"
  },
  lastItem: {
    marginLeft: "2em",
    paddingRight: 0,
    marginRight: "1em",
    "@media (max-width:900px)": {
      marginLeft: "1em"
    },
    "@media (max-width:768px)": {
      marginLeft: 0
    }
  },
  "@media (max-width:768px)": {
    navbar: {
      flexDirection: "column",
      minWidth: "100%"
    },
    userLogin: {
      marginLeft: 0,
      borderTop: "2px solid #0f2940",
      width: "100%",
      paddingTop: ".5em",
      paddingBottom: ".5em",
      display: "flex",
      justifyContent: "center"
    }
  }
});

const NavBar = ({ navbarOpen, setNavbarOpen }) => {
  const classes = useStyles();
  const userContext = useContext(UserContext);
  const account = userContext.account;
  const { isAuthenticated, user } = useAuth0();

  const handleHamburgerMenuClick = () => {
    setNavbarOpen(window.innerWidth < 768 ? !navbarOpen : false);
  };

  const getUserGreeting = () => (
    <li className={classes.userLogin}>
      {`${user.name} (${userContext.account ? userContext.account.id : ""})`}
    </li>
  );

  return (
    <ul className={classes.navbar}>
      {isAuthenticated && (
        <li className={classes.linkBlock}>
          <NavLink
            className={classes.link}
            // activeClassName={classes.currentLink}
            to="/projects"
            onClick={handleHamburgerMenuClick}
          >
            My Projects
          </NavLink>
        </li>
      )}
      <li className={classes.linkBlock}>
        <NavLink
          className={classes.link}
          // activeClassName={classes.currentLink}
          to="/calculation/1/0"
          onClick={handleHamburgerMenuClick}
        >
          Create Project
        </NavLink>
      </li>
      {account && account.isSecurityAdmin && (
        <li className={classes.linkBlock}>
          <NavLink
            className={classes.link}
            // activeClassName={classes.currentLink}
            to="/roles"
            onClick={handleHamburgerMenuClick}
          >
            Security
          </NavLink>
        </li>
      )}
      <li className={classes.linkBlock}>
        <NavLink
          className={classes.link}
          // activeClassName={classes.currentLink}
          to="/about"
          onClick={handleHamburgerMenuClick}
        >
          About
        </NavLink>
      </li>
      <li className={classes.linkBlock}>
        <NavLink
          className={classes.link}
          // activeClassName={classes.currentLink}
          to="/faqs"
          onClick={handleHamburgerMenuClick}
        >
          FAQ
        </NavLink>
      </li>
      <li className={classes.linkBlock}>
        <NavLink
          className={classes.link}
          // activeClassName={classes.currentLink}
          to="/feedback"
          onClick={handleHamburgerMenuClick}
        >
          Feedback
        </NavLink>
      </li>
      {/* <NavBarLogin
        account={account}
        classes={classes}
        navbarOpen={navbarOpen}
        handleHamburgerMenuClick={handleHamburgerMenuClick}
      /> */}
      {isAuthenticated ? (
        <div
          className={classes.userLogin}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {getUserGreeting(account)}
          <LogoutButton />
        </div>
      ) : (
        <div className={classes.userLogin}>
          <LoginButton />
        </div>
      )}
    </ul>
  );
};

NavBar.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    role: PropTypes.string,
    isAdmin: PropTypes.bool,
    isSecurityAdmin: PropTypes.bool
  }),
  navbarOpen: PropTypes.bool,
  setNavbarOpen: PropTypes.func.isRequired
};

export default NavBar;
