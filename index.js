import { getUsers, getInfoUsers, getUserBy, addUser, updateUser, changeStatusLoggIn, logIn, deleteUser, help } from "./models.js";
import 'dotenv/config';
import { handleError } from "./utils/handleError.js";

const LOG_FILE = process.env.LOG_FILE;

const args = process.argv.splice(2);

let input;

(args == "") ? input = "invalid" : input = args[0].toLowerCase();

switch (input) {
    case "getusers":
        console.log(getUsers());
    break;
    case "getinfousers":
        console.log(getInfoUsers());
    break;
    case "getuserby":
        console.log(getUserBy(args[1]));
    break;
    case "adduser":
        console.log(addUser(args));
    break;
    case "updateuser":
        console.log(updateUser(args));
    break;
    case "changestatusioggin":
        console.log(changeStatusLoggIn());
    break;
    case "login":
        console.log(logIn(args));
    break;
    case "deleteuser":
        console.log(deleteUser(args[1]));
    break;
    case "help":
        console.log(help());
    break;
    default:
        handleError(new Error("INVALID ARGUMENTS"), LOG_FILE);
        console.log("INVALID ARGUMENTS")
}
