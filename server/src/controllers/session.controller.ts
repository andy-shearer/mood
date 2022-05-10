import { CookieOptions, Request, Response } from "express";
import config from "config";
import {
  findAndUpdateUser,
  getGoogleOauthTokens,
  getGoogleUser,
} from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import { createSession } from "../services/session.service";
import log from "../utils/logger";

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15m
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

const refreshTokenCookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 3.154e10, // 1yr
};

// Oauth handler
export async function googleOauthHandler(req: Request, res: Response) {
  // get the code from the query-string
  const code = req.query.code as string;

  try {
    // get the id and access token with the code
    const { id_token, access_token } = await getGoogleOauthTokens({ code });

    // console.log({ id_token, access_token });
    // get the user with token
    const googleUser = await getGoogleUser({ id_token, access_token });
    // jwt.decode(id_token)
    // console.log({ googleUser });

    if (!googleUser.verified_email) {
      return res.status(403).send("Google Account is not verfied");
    }

    // console.log({ googleUser });
    // upsert the user
    const user = await findAndUpdateUser(
      { email: googleUser.email },
      {
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
      },
      { upsert: true, new: true }
    );

    if (!user) {
      return;
    }

    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create an access token
    const accessToken = signJwt(
      {
        ...user.toJSON(),
        session: session._id,
      },
      {
        expiresIn: config.get("accessTokenTtl"), // 15 minutes
      }
    );

    //   create a refresh token
    const refreshToken = signJwt(
      {
        ...user.toJSON(),
        session: session._id,
      },
      {
        expiresIn: config.get("refreshTokenTtl"), // 15 minutes
      }
    );

    // set cookies
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    // console.log({ accessToken, refreshToken });
    // redirect back to client
    res.redirect(`${config.get("origin")}/dashboard`);
  } catch (error: any) {
    // console.log(error);
    log.error(error, "Failed to authorize Google user");
    return res.redirect(`${config.get("origin")}/oauth/error`);
  }
}
