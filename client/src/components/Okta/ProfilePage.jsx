import React, { useEffect, useContext } from "react";
// import PropTypes from "prop-types";
import * as accountService from "../../services/account.service";
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from "../../contexts/UserContext";

const ProfilePage = () => {
  const { user: oktaUser } = useAuth0();
  const { updateAccount, account } = useContext(UserContext);

  useEffect(() => {
    // Use Okta profile info to get TDM Authorization info and
    // set jwt cookie.
    const getAuth = async () => {
      if (oktaUser) {
        const loginResponse = await accountService.getAuthorization({
          email: oktaUser.email,
          lastName: oktaUser.nickname || oktaUser.name,
          firstName: oktaUser.name
        });
        if (loginResponse.isSuccess) {
          updateAccount(loginResponse.user);
        }
      }
    };
    getAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!oktaUser) {
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
                src={oktaUser.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">{oktaUser.name}</h2>
                <span className="profile__description">{oktaUser.email}</span>
              </div>
            </div>
            <div className="profile__details">
              <h2>Decoded ID Token</h2>
              <span className="profile__description">
                {JSON.stringify(oktaUser, null, 2)}
              </span>
            </div>
          </div>
        </div>
        {account && (
          <div>
            <h1>TDM User</h1>
            <span>id: {JSON.stringify(account, null, 2)}</span>
          </div>
        )}
      </div>
    </>
  );
};

// ProfilePage.propTypes = {
//   account: PropTypes.shape(),
//   updateAccount: PropTypes.func
// };

export default ProfilePage;
