require("dotenv").config();

export default {
  port: 1337,
  origin: "http://localhost:3000",
  dbUri:
    "mongodb+srv://emmy123:emmy123@devnetwork.r0rje.mongodb.net/mood?retryWrites=true&w=majority",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  googleClientId: process.env.GOOGLE_CLIENT_ID as string,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  googleOauthRedirectUrl: process.env.OAUTH_REDIRECT_URL as string,
  //   accessTokenPrivateKey: ``,
  //   accessTokenPublicKey: ``,
  //   refreshTokenPrivateKey: ``,
  //   refreshTokenPublicKey: ``,
};
