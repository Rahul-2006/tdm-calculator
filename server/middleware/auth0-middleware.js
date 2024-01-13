const dotenv = require("dotenv");
const { auth } = require("express-oauth2-jwt-bearer");

dotenv.config();

// This middleware method validates the Okta Access token, and is only used
// by the endpoint /accounts/getauthorization to set up the TDM
// authorization JWT for subsequent calls that may or may not require
// information about the roles granted to the user.

const validateAccessToken = auth({
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  audience: process.env.AUTH0_AUDIENCE
});

module.exports = {
  validateAccessToken
};
