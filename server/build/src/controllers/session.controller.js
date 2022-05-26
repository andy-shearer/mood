"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOauthHandler = void 0;
const config_1 = __importDefault(require("config"));
const user_service_1 = require("../services/user.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const session_service_1 = require("../services/session.service");
const logger_1 = __importDefault(require("../utils/logger"));
const accessTokenCookieOptions = {
    maxAge: 900000,
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "lax",
    secure: false,
};
const refreshTokenCookieOptions = Object.assign(Object.assign({}, accessTokenCookieOptions), { maxAge: 3.154e10 });
// Oauth handler
function googleOauthHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // get the code from the query-string
        const code = req.query.code;
        try {
            // get the id and access token with the code
            const { id_token, access_token } = yield (0, user_service_1.getGoogleOauthTokens)({ code });
            // console.log({ id_token, access_token });
            // get the user with token
            const googleUser = yield (0, user_service_1.getGoogleUser)({ id_token, access_token });
            // jwt.decode(id_token)
            // console.log({ googleUser });
            if (!googleUser.verified_email) {
                return res.status(403).send("Google Account is not verfied");
            }
            // console.log({ googleUser });
            // upsert the user
            const user = yield (0, user_service_1.findAndUpdateUser)({ email: googleUser.email }, {
                email: googleUser.email,
                name: googleUser.name,
                picture: googleUser.picture,
            }, { upsert: true, new: true });
            if (!user) {
                return;
            }
            // console.log(user._id);
            // create a session
            const session = yield (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
            // console.log({ session });
            // create an access token
            const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), {
                expiresIn: config_1.default.get("accessTokenTtl"), // 15 minutes
            });
            //   create a refresh token
            const refreshToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session._id }), {
                expiresIn: config_1.default.get("refreshTokenTtl"), // 15 minutes
            });
            // set cookies
            res.cookie("accessToken", accessToken, accessTokenCookieOptions);
            res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
            // console.log({ accessToken });
            // redirect back to client
            res.redirect(`${config_1.default.get("origin")}/dashboard`);
        }
        catch (error) {
            // console.log(error);
            logger_1.default.error(error, "Failed to authorize Google user");
            return res.redirect(`${config_1.default.get("origin")}/oauth/error`);
        }
    });
}
exports.googleOauthHandler = googleOauthHandler;
