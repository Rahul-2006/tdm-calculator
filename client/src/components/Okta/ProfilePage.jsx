import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useContext, useCallback } from "react";
import * as accountService from "../../services/account.service";
import UserContext from "../../contexts/UserContext";

const ProfilePage = () => {
  const { user } = useAuth0();
  const userContext = useContext(UserContext);

  const updateAccount = useCallback(
    tdmUser => {
      userContext.updateAccount(tdmUser);
    },
    [userContext]
  );

  useEffect(() => {
    // Use Okta profile info to get TDM Authorization info and
    // set jwt cookie.
    const getAuth = async () => {
      if (user) {
        const loginResponse = await accountService.getAuthorization({
          email: user.email,
          lastName: user.nickname || user.name,
          firstName: user.name
        });
        if (loginResponse.isSuccess) {
          updateAccount(loginResponse.user);
        }
      }
    };
    getAuth();
  }, [user, updateAccount]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Okta Profile
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              You can use the <strong>ID Token</strong> to get the profile
              information of an authenticated user.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          <div className="profile-grid">
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
            <div className="profile__details">
              <h2>Decoded ID Token</h2>
              <span className="profile__description">
                {JSON.stringify(user, null, 2)}
              </span>
            </div>
          </div>
        </div>
        {userContext && userContext.account && (
          <div>
            <h1>TDM User</h1>
            <span>id: {JSON.stringify(userContext, null, 2)}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
