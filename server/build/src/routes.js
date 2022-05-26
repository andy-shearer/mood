"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_controller_1 = require("./controllers/contact.controller");
const express_validator_1 = require("express-validator");
const session_controller_1 = require("./controllers/session.controller");
const webhook_controller_1 = require("./controllers/webhook.controller");
const requireUser_1 = __importDefault(require("./middleware/requireUser"));
function routes(app) {
    // Performance & healthCheck
    app.get("/healthCheck", (req, res) => {
        res.sendStatus(200);
    });
    // OAuth
    app.get("/api/sessions/oauth/google", session_controller_1.googleOauthHandler);
    // Create user contact details
    app.post("/api/contact", [requireUser_1.default, (0, express_validator_1.check)("mobile").exists()], contact_controller_1.createContactHandler);
    // Get user contact details
    app.get("/api/contact/:contactId", requireUser_1.default, contact_controller_1.getContactInfoHandler);
    // Update user contact details
    app.put("/api/contact/:contactId/:participantId", [requireUser_1.default, (0, express_validator_1.check)("mobile").exists()], contact_controller_1.updateContactInfoHandler);
    // Webhook handler for SMS events
    app.get("/webhook", webhook_controller_1.webhookHandler);
}
exports.default = routes;
