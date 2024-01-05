import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    const result = await loginWithRedirect({
      appState: {
        returnTo: "/profile"
      },
      authorizationParams: {
        prompt: "login"
      }
    });
    console.error(result);
  };

  return (
    <button className="button__login" onClick={handleLogin}>
      Log In Now
    </button>
  );
};

export default LoginButton;
