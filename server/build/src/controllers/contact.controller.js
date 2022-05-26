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
exports.updateContactInfoHandler = exports.getContactInfoHandler = exports.createContactHandler = void 0;
const contact_service_1 = require("../services/contact.service");
const express_validator_1 = require("express-validator");
const logger_1 = __importDefault(require("../utils/logger"));
function createContactHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        // console.log(userId);
        const body = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const contact = yield (0, contact_service_1.createContact)(Object.assign(Object.assign({}, body), { user: userId }));
            return res.send(contact);
        }
        catch (error) {
            logger_1.default.error(error);
            return res.status(409).send(error.message);
        }
    });
}
exports.createContactHandler = createContactHandler;
function getContactInfoHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const contactId = req.params.contactId;
        const contact = yield (0, contact_service_1.findContact)({ contactId });
        if (!contact) {
            return res.sendStatus(404);
        }
        return res.send(contact);
    });
}
exports.getContactInfoHandler = getContactInfoHandler;
function updateContactInfoHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const contactId = req.params.contactId;
        const contact = yield (0, contact_service_1.findContact)({ contactId });
        if (!contact) {
            return res.sendStatus(404);
        }
        const update = Object.assign(Object.assign({}, contact), { participantId: req.params.participantId });
        if (String(contact.user) !== userId) {
            return res.sendStatus(403);
        }
        const updateContact = yield (0, contact_service_1.findAndUpdateContact)({ contactId }, update, {
            new: true,
        });
        return res.send(updateContact);
    });
}
exports.updateContactInfoHandler = updateContactInfoHandler;
