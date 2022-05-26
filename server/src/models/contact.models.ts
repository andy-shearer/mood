import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.models";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface ContactInput {
  user: UserDocument["_id"];
  mobile: number;
  participantId: string;
}

export interface ContactDocument extends ContactInput, mongoose.Document {
  contactId: string;
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new mongoose.Schema(
  {
    contactId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${nanoid()}`,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model<ContactDocument>("Contact", contactSchema);

export default ContactModel;
