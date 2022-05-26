"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nanoid_1 = require("nanoid");
const nanoid = (0, nanoid_1.customAlphabet)("abcdefghijklmnopqrstuvwxyz0123456789", 10);
const contactSchema = new mongoose_1.default.Schema({
    contactId: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${nanoid()}`,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    participantId: {
        type: String,
        unique: true,
    },
}, {
    timestamps: true,
});
const ContactModel = mongoose_1.default.model("Contact", contactSchema);
exports.default = ContactModel;
