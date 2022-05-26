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
exports.findAndUpdateContact = exports.findContact = exports.createContact = void 0;
const contact_models_1 = __importDefault(require("../models/contact.models"));
function createContact(contact) {
    return __awaiter(this, void 0, void 0, function* () {
        const userContact = yield contact_models_1.default.create(contact);
        return userContact.toJSON();
    });
}
exports.createContact = createContact;
function findContact(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        return contact_models_1.default.findOne(query, {}, options);
    });
}
exports.findContact = findContact;
function findAndUpdateContact(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return contact_models_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.findAndUpdateContact = findAndUpdateContact;
