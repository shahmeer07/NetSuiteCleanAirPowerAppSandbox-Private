

const express = require("express");
const axios = require("axios");
const { KJUR } = require("jsrsasign");
const cryptojs = require("crypto-js");

// Configuration Variables
const CONSUMER_KEY = "0e929dbac4e524adb6dee229d38b3b8b442136a00a7015c4b7b5a86cdfb7261d";
const CERTIFICATE_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
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
2EUtp3XQejdQOLZTPY6AF0b1oQ==
-----END PRIVATE KEY-----
`;
const KID = "OoWjUzBLtPWYKaeYhjxxNkAlokB9iuo6LHh0Qw_eJmU";
const ACCOUNT_ID = "9845346-sb1";
const TOKEN_URL = `https://${ACCOUNT_ID}.suitetalk.api.netsuite.com/services/rest/auth/oauth2/v1/token`;



// Generating JWT
function generateJWT() {
    // JWT Header
    const jwtHeader = {
      alg: "PS256",
      typ: "JWT",
      kid: KID,
    };
  
    // JWT Payload
    const currentTime = Math.floor(Date.now() / 1000);
    const jwtPayload = {
      iss: CONSUMER_KEY,
      scope: "restlets rest_webservices",
      iat: currentTime,
      exp: currentTime + 3600, // Expires in 1 hour
      aud: TOKEN_URL,
    };
  
    // Converting to Strings
    const stringifiedJwtHeader = JSON.stringify(jwtHeader);
    const stringifiedJwtPayload = JSON.stringify(jwtPayload);
  
    // Signing JSON Web TOken here
    const signedJWT = KJUR.jws.JWS.sign(
      "PS256",
      stringifiedJwtHeader,
      stringifiedJwtPayload,
      CERTIFICATE_PRIVATE_KEY
    );
  
    return signedJWT;
  }
  
  // Requesting Access Token here
  async function requestAccessToken() {
    try {
      const clientAssertion = generateJWT();
  
      const data = new URLSearchParams({
        grant_type: "client_credentials",
        client_assertion_type:
          "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: clientAssertion,
      });
  
      const response = await axios.post(TOKEN_URL, data.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      
      return response.data.access_token;
    } catch (error) {
      console.error("Error requesting access token:", error.response?.data || error.message);
      throw error;
    }
  }

  const app = express();
const PORT = process.env.PORT || 3000;


  app.get("/", async (req, res) => {
    try {
      const accessToken = await requestAccessToken();
      res.json({ accessToken });
    } catch (error) {
      console.error("Failed to retrieve access token:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to retrieve access token", details: error.message });
    }
  });
  
  // Main Execution function here to finally get the access token
  (async () => {
    try {
      const accessToken = await requestAccessToken();
      console.log("Successfully retrieved Access Token:", accessToken);
      return accessToken
    } catch (error) {
      console.error("Failed to retrieve Access Token.");
    }
  })();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
