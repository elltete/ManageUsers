import { existsSync, read, readFileSync, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
import "dotenv/config";
import { handleError } from "./utils/handleError.js";
import {
  createNewUserObject,
  createUpdateUserObject,
} from "./utils/createObjectUser.js";

const DATA_USERS = process.env.DATA_USERS;
const LOG_FILE = process.env.LOG_FILE;
const DATA_HELP = process.env.DATA_HELP;

const getUsers = () => {
  try {
    const existsFile = existsSync(DATA_USERS);

    if (!existsFile) {
      writeFileSync(DATA_USERS, JSON.stringify([]));
      throw new Error("CREATING DATA USERS FILE");
    }

    const dataUsers = JSON.parse(readFileSync(DATA_USERS));

    if (dataUsers.length == 0) {
      throw new Error("DATA USER FILE IS EMPTY");
    }

    return dataUsers;
  } catch (error) {
    handleError(error, LOG_FILE);
    return error.message;
  }
};

const getInfoUsers = () => {
  try {
    const dataUsers = getUsers();

    if (
      (dataUsers.length == 0) |
      (dataUsers === "DATA USER FILE IS EMPTY") |
      (dataUsers === "CREATING DATA USERS FILE")
    ) {
      throw new Error("DATA USER FILE IS EMPTY");
    }

    const dataInfoUser = dataUsers.map(function (user) {
      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    });

    return dataInfoUser;
  } catch (error) {
    handleError(error, LOG_FILE);
    return error.message;
  }
};

const getUserBy = (argv) => {
  try {
    if (!argv) {
      throw new Error("ID/EMAIL IS MISSING");
    }

    const dataUsers = getUsers();

    if (
      (dataUsers.length == 0) |
      (dataUsers === "DATA USER FILE IS EMPTY") |
      (dataUsers === "CREATING DATA USERS FILE")
    ) {
      throw new Error("DATA USER FILE IS EMPTY");
    }

    const foundUser = dataUsers.find(
      (user) =>
        user.id === argv || user.email.toLowerCase() === argv.toLowerCase()
    );

    if (!foundUser) {
      throw new Error("USER NOT FOUND IN DATA USERS");
    }

    const dataInfoUserShow = {
      email: foundUser.email,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      isLoggedIn: foundUser.isLoggedIn,
    };

    return dataInfoUserShow;
  } catch (error) {
    handleError(error, LOG_FILE);
    return error.message;
  }
};

const addUser = (userData) => {
  try {
    if (userData.length != 5) {
      //verificar, ya que recivbe un Object
      throw new Error("INVALID ARGUMENTS, USE HELP FOR MORE INFORMATION");
    }

    let newUser = createNewUserObject(userData);

    const { firstName, lastName, email, password, isLoggedIn } = newUser; //destructuring

    // VALIDAR el emial sea formato correcto

    const dataUsers = getUsers();

    if (
      (dataUsers.length == 0) |
      (dataUsers === "DATA USER FILE IS EMPTY") |
      (dataUsers === "CREATING DATA USERS FILE")
    ) {
      throw new Error("DATA USER FILE IS EMPTY");
    }

    const foundUser = dataUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (foundUser) {
      throw new Error("USER FOUND IN DATA USERS, ADD REQUEST HAS FAILED");
    }

    newUser = {
      id: randomUUID(),
      firstName,
      lastName,
      email,
      password, ////// FALTA ENCRIPTAR
      isLoggedIn,
    };

    dataUsers.push(newUser);

    writeFileSync(DATA_USERS, JSON.stringify(dataUsers));

    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    };

  } catch (error) {
    handleError(error, LOG_FILE);
    return error.message;
  }
};

const updateUser = (userData) => {
  try {
    if (userData.length != 6) {
      //verificar, ya que recivbe un Object
      throw new Error("INVALID ARGUMENTS, USE HELP FOR MORE INFORMATION");
    }

    let modifyUser = createUpdateUserObject(userData);

    const dataUserFind = userData[1];

    const { firstName, lastName, email, password } = modifyUser; //destructuring

    // VALIDAR el email sea formato correcto

    const dataUsers = getUsers();

    if (
      (dataUsers.length == 0) |
      (dataUsers === "DATA USER FILE IS EMPTY") |
      (dataUsers === "CREATING DATA USERS FILE")
    ) {
      throw new Error("DATA USER FILE IS EMPTY");
    }

    const foundUser = dataUsers.find(
      (user) => user.id.toLowerCase() === dataUserFind.toLowerCase() || user.email.toLowerCase() === dataUserFind.toLowerCase()
    );

    if (!foundUser) {
      throw new Error(
        "USER NOT FOUND IN DATA USERS, MODIFY REQUEST HAS FAILED"
      );
    }

    foundUser.firstName = firstName;
    foundUser.lastName = lastName;
    foundUser.email = email;
    foundUser.password = password;

    writeFileSync(DATA_USERS, JSON.stringify(dataUsers));

    return {
      id: foundUser.id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email
    };

  } catch (error) {
    handleError(error, LOG_FILE);
    return error.message;
  }
};

const changeStatusLoggIn = (email) => {
  try {
    if (!email) {
      throw new Error("EMAIL IS MISSING");
    }

    //unificar funciones

    const dataUsers = getUsers();

    if (
      (dataUsers.length == 0) |
      (dataUsers === "DATA USER FILE IS EMPTY") |
      (dataUsers === "CREATING DATA USERS FILE")
    ) {
      throw new Error("DATA USER FILE IS EMPTY");
    }

    const foundUser = dataUsers.find(
      (user) =>
        user.id === email || user.email.toLowerCase() === email.toLowerCase()
    );

    if (!foundUser) {
      throw new Error("USER NOT FOUND IN DATA USERS");
    }

    if (foundUser.isLoggedIn) {
      foundUser.isLoggedIn = false;
    } else {
      foundUser.isLoggedIn = true;
    }

    writeFileSync(DATA_USERS, JSON.stringify(dataUsers));

    handleError(new Error("STATUS LOGGIN CHANGED"), LOG_FILE);

    return "STATUS LOGGIN CHANGED";
  } catch (error) {
    handleError(error, LOG_FILE);
    return error.message;
  }
};

const logIn = (userData) => {
  try {
    if (userData.length != 3) {
      throw new Error("INVALID ARGUMENTS, USE HELP FOR MORE INFORMATION");
    }

    const email = userdata[1];
    const password = userData[2];
  } catch (error) {
    handleError(error, LOG_FILE);
    return error.message;
  }
};

const deleteUser = (argv) => {
  try {
    if (!argv) {
      throw new Error("ID/EMAIL IS MISSING");
    }

    const dataUsers = getUsers();

    if (
      (dataUsers.length == 0) |
      (dataUsers === "DATA USER FILE IS EMPTY") |
      (dataUsers === "CREATING DATA USERS FILE")
    ) {
      throw new Error("DATA USER FILE IS EMPTY");
    }

    const foundUser = dataUsers.find(
      (user) =>
        user.id === argv || user.email.toLowerCase() === argv.toLowerCase()
    );

    if (!foundUser) {
      throw new Error("USER NOT FOUND IN DATA USERS");
    }

    const newDataUsers = dataUsers.filter(
      (user) => user.email.toLowerCase() !== argv.toLowerCase()
    );

    writeFileSync(DATA_USERS, JSON.stringify(newDataUsers));

    return newDataUsers;
  } catch (error) {
    handleError(error, LOG_FILE);
    return error.message;
  }
};

const help = () => {
  try {
    const exist = existsSync(DATA_HELP);

    if (!exist) {
      throw new Error("HELP FILE NOT EXIST");
    }

    const dataHelp = readFileSync(DATA_HELP, "utf-8");

    return dataHelp;
  } catch (error) {
    handleError(error, LOG_FILE);
    return error.message;
  }
};

export {
  getUsers,
  getInfoUsers,
  getUserBy,
  addUser,
  updateUser,
  changeStatusLoggIn,
  logIn,
  deleteUser,
  help,
};
