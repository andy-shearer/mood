import mongoose from "mongoose";
import { UserDocument } from "./user.models";

export interface ContactInput {
  user: UserDocument["_id"];
  mobile: number;
  social: string;
}

export interface ContactDocument extends ContactInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    social: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model<ContactDocument>("Contact", contactSchema);

export default ContactModel;
