import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";

const LoginButton = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [oktaUserInfo, setOktaUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setOktaUserInfo(null);
    } else {
      oktaAuth.getUser().then(info => {
        setOktaUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const handleLogin = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const handleLogout = async () => {
    await oktaAuth.signOut();
  };

  if (!oktaUserInfo)
    return <button onClick={handleLogin}>Login / Register</button>;
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LoginButton;
