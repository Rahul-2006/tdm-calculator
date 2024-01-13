import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import * as accountService from "../../services/account.service";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = async () => {
    // Expire the TDM JWT authorization cookie
    await accountService.logout();
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  };

  return (
    <button className="button__logout" onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton;
