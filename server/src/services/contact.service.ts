import ContactModel, { ContactInput } from "../models/contact.models";

export async function createContact(contact: ContactInput) {
  const userContact = await ContactModel.create(contact);

  return userContact.toJSON();
}
