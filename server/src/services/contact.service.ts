import { FilterQuery, QueryOptions } from "mongoose";
import ContactModel, {
  ContactDocument,
  ContactInput,
} from "../models/contact.models";

export async function createContact(contact: ContactInput) {
  const userContact = await ContactModel.create(contact);

  return userContact.toJSON();
}

export async function findContact(
  query: FilterQuery<ContactDocument>,
  options: QueryOptions = { lean: true }
) {
  return ContactModel.findOne(query, {}, options);
}
