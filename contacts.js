const path = require('path');
const {v4} = require('uuid');
const fs = require('fs').promises;

const contactsPath = path.resolve('./db/contacts.json');


async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    // console.log(contacts);
    return contacts;
  };

  const getContactById = async(contactId) => {
    // const data = await fs.readFile(contactsPath);
    // const contacts =JSON.parse(data);
    const contacts = await listContacts();
    const result = contacts.find(item => Number(item.id) === contactId)
    if (!result) {
        return null;
    }
    return result;
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => Number(item.id) === contactId)
    if (idx === -1) {
        return null;
    }
    contacts.splice(idx,1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  }
  
   const addContact = async(name, email, phone) => {
    const contactsArr = await listContacts();
    const newContact = {id:v4(), name: name, email: email, phone: phone};
    contactsArr.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsArr));
    return newContact;
  }
  
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  };