import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import axios from "axios";
import UserModel, { UserDocument } from "../models/user.models";
import log from "../utils/logger";
import qs from "qs";
require("dotenv").config();

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

interface GoogleTokensResult {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
  id_token: string;
}
export async function getGoogleOauthTokens({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.OAUTH_REDIRECT_URL as string,
    grant_type: "authorization_code",
  };

  // console.log({ values });

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    log.error(error, "Failed to fetch google OAuth Tokens");
    throw new Error(error.message);
  }
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    log.error(error, "Error fetching google user");
    throw Error(error.message);
  }
}

export async function findAndUpdateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>,
  options: QueryOptions = {}
) {
  return UserModel.findOneAndUpdate(query, update, options);
}

export async function getAllUsers(callback) {
  UserModel.find(function (err, results) {
    if(err) {
      log.error(err, "Error fetching all users");
    }

    // Invoke callback with the returned results
    callback(results);
  });
};
//
