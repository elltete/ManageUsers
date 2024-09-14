import { getUsers, getInfoUsers, getUsersbyId, getUsersbyEmail, addUser, updateUser, changeStatusLoggIn, logIn, deleteUser, help } from "./models.js";
import 'dotenv/config';
import { handleError } from "./utils/handleError.js";

const LOG_FILE = process.env.LOG_FILE;

const args = process.argv.splice(2);

let input;

if (args == ""){
    input = "invalid";
} else {
    input = args[0].toLowerCase();
}

switch (input) {
    case "getUsers":
        console.log(getUsers());
    break;
    case "getInfoUsers":
        console.log(getInfoUsers());
    break;
    case "getUsersbyId":
        console.log(getUsersbyId(args[1]));
    break;
    case "getUsersbyEmail":
        console.log(getUsersbyEmail(args[1]));
    break;
    case "addUser":
        console.log(addUser(args));
    break;
    case "updateUser":
        console.log(updateUser(args));
    break;
    case "changeStatusLoggIn":
        console.log(changeStatusLoggIn());
    break;
    case "logIn":
        console.log(logIn(args));
    break;
    case "deleteUser":
        console.log(deleteUser(args[1]));
    break;
    case "help":
        console.log(help());
    break;
    default:
        handleError(new Error("INVALID ARGUMENTS"), LOG_FILE);
        console.log("INVALID ARGUMENTS")
}
