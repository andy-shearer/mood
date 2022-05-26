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
exports.findAndUpdateUser = exports.getGoogleUser = exports.getGoogleOauthTokens = exports.findUser = void 0;
const axios_1 = __importDefault(require("axios"));
const user_models_1 = __importDefault(require("../models/user.models"));
const logger_1 = __importDefault(require("../utils/logger"));
const qs_1 = __importDefault(require("qs"));
require("dotenv").config();
function findUser(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_models_1.default.findOne(query).lean();
    });
}
exports.findUser = findUser;
function getGoogleOauthTokens({ code, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://oauth2.googleapis.com/token";
        const values = {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.OAUTH_REDIRECT_URL,
            grant_type: "authorization_code",
        };
        // console.log({ values });
        try {
            const res = yield axios_1.default.post(url, qs_1.default.stringify(values), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            return res.data;
        }
        catch (error) {
            console.log(error.response.data.error);
            logger_1.default.error(error, "Failed to fetch google OAuth Tokens");
            throw new Error(error.message);
        }
    });
}
exports.getGoogleOauthTokens = getGoogleOauthTokens;
function getGoogleUser({ id_token, access_token, }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            });
            return res.data;
        }
        catch (error) {
            logger_1.default.error(error, "Error fetching google user");
            throw Error(error.message);
        }
    });
}
exports.getGoogleUser = getGoogleUser;
function findAndUpdateUser(query, update, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_models_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.findAndUpdateUser = findAndUpdateUser;
//
