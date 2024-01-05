import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const CallbackPage = () => {
  const { error, user } = useAuth0();

  if (error) {
    return (
      <>
        <div className="content-layout">
          <h1>Error</h1>
          <div>
            <p>
              <span>{error.message}</span>
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <h1>User</h1>
      <div>
        <p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </p>
      </div>
    </div>
  );
};

export default CallbackPage;
