import { get } from "lodash";
import SessionModel from "../models/session.models";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import config from "config";
import { findUser } from "./user.service";

export async function createSession(userId: string, userAgent: string) {
  // Here we create a session with userId and userAgent
  const session = await SessionModel.create({
    user: userId,
    userAgent,
  });

  return session.toJSON();
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  // find the user
  const user = await findUser({ _id: session.user });

  if (!user) return false;

  // create a new access token
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    {
      expiresIn: config.get("accessTokenTtl"), // 15 minutes
    }
  );

  return accessToken;
}
