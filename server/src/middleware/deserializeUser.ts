import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../services/session.service";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");

  // check for accesstoen
  if (!accessToken) {
    return next();
  }

  const { expired, decoded } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (!newAccessToken) return false;

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }

    const result = verifyJwt(newAccessToken);

    res.locals.user = result.decoded;

    return next();
  }

  return next();
};

export default deserializeUser;
