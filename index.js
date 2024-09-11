import { getUsers, getUsersbyId, addUser, updateUser, deleteUser, help } from "./models.js";
import 'dotenv/config';

const LOG_FILE = process.env.LOG_FILE;

const args = process.argv.splice(2);

const input = args[0].toLowerCase();

switch (input) {
    case "getUsers":
        console.log(getUsers());
    break;
    case "getUsersbyId":
        console.log(getUsersbyId());
    break;
    case "addUser":
        console.log(addUser());
    break;
    case "updateUser":
        console.log(updateUser());
    break;
    case "deleteUser":
        console.log(deleteUser());
    break;
    case "help":
        console.log(help());
    break;
    default:

}