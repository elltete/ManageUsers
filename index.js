import { getUsers, getUsersbyId, addUser, updateUser, deleteUser, help } from "./models.js";
import 'dotenv/config';
import { handleError } from "./utils/handleError.js";

const LOG_FILE = process.env.LOG_FILE;

const args = process.argv.splice(2);

let input;

if (args == ""){
    input = 1;
} else {
    input = args[0].toLowerCase();
}

switch (input) {
    case "getUsers":
        console.log(getUsers());
    break;
    case "getUsersbyId":
        console.log(getUsersbyId(args[1]));
    break;
    case "addUser":
        console.log(addUser(args));
    break;
    case "updateUser":
        console.log(updateUser(args));
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