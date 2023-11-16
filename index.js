
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv


const {listContacts, getContactById, removeContact, addContact} = require('./contacts');


async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
      case "list":
      const list = await listContacts();
      console.log(list);
        break;
    
      case "get":
        const get = await getContactById(id);
        if(!id){
            throw new Error (`Contact with ${id} not find`);
        };
        console.log(get);
        break;
  
      case "add":
        const add = await addContact(name, email, phone);

        console.log(add);
        break;
  
      case "remove":
        const remove = await removeContact(id);
        if(!id){
            throw new Error (`Contact with ${id} not find`);
        };
        console.log(remove);
        break;
  
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  }
  
  invokeAction(argv);


  