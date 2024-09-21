import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import "dotenv/config";
import { handleError } from "./utils/handleError.js";
import {
  createNewUserObject,
  createUpdateUserObject,
  validateEmail,
  hashPassword,
  compareHashPassword,
  createChangePasswordUserObject,
  createLoginUserObject,
} from "./utils/createObjectUser.js";

const DATA_USERS = process.env.DATA_USERS;
const ERROR_FILE = process.env.ERROR_FILE;
const LOG_FILE = process.env.LOG_FILE;
const DATA_HELP = process.env.DATA_HELP;

const getUsers = () => {
  const existsFile = existsSync(DATA_USERS);

  if (!existsFile) {
    writeFileSync(DATA_USERS, JSON.stringify([]));
    handleError(
      new Error("USERS FILE DOESN'T EXIST - CREATING USERS FILE"),
      ERROR_FILE
    );
    console.log("USERS FILE DOESN'T EXIST - CREATING USERS FILE");
  }

  const dataUsers = JSON.parse(readFileSync(DATA_USERS));

  if (dataUsers.length == 0) {
    handleError(new Error("DATA USER FILE IS EMPTY"), ERROR_FILE);
    console.log("DATA USER FILE IS EMPTY");
  }

  return dataUsers;
};

const getInfoUsers = () => {
  const dataUsers = getUsers();

  const dataInfoUser = dataUsers.map(function (user) {
    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isLoggesIn: user.isLoggedIn,
    };
  });

  return dataInfoUser;
};

const getUserBy = (argv) => {
  try {
    if (!argv) {
      throw new Error("ID/EMAIL IS MISSING");
    }

    const dataUsers = getUsers();

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
    handleError(error, ERROR_FILE);
    return error.message;
  }
};

const addUser = (userData) => {
  try {
    if (userData.length != 5) {
      throw new Error("INVALID ARGUMENTS, USE HELP FOR MORE INFORMATION");
    }

    let newUser = createNewUserObject(userData);

    const { firstName, lastName, email, password, isLoggedIn } = newUser; //destructuring

    if (!validateEmail(email)) {
      throw new Error("EMAIL FORMAT INVALID, ADD-USER REQUEST HAS FAILED");
    }

    const dataUsers = getUsers();

    const foundUser = dataUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (foundUser) {
      throw new Error(
        "EMAIL USER HAS FOUND IN DATA USERS, ADD-USER REQUEST HAS FAILED"
      );
    }

    newUser = {
      id: randomUUID(),
      firstName,
      lastName,
      email,
      password: hashPassword(password),
      isLoggedIn,
    };

    dataUsers.push(newUser);

    writeFileSync(DATA_USERS, JSON.stringify(dataUsers));

    handleError(new Error("NEW USER WAS CREATED"), LOG_FILE);

    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    };
  } catch (error) {
    handleError(error, ERROR_FILE);
    return error.message;
  }
};

const updateUser = (userData) => {
  try {
    if (userData.length != 6) {
      throw new Error("INVALID ARGUMENTS, USE HELP FOR MORE INFORMATION");
    }

    const dataUserFind = userData[1];

    const { firstName, lastName, email, password } =
      createUpdateUserObject(userData); //destructuring

    if (!validateEmail(email)) {
      throw new Error("EMAIL FORMAT INVALID, UPDATE-USER REQUEST HAS FAILED");
    }

    const dataUsers = getUsers();

    const foundUser = dataUsers.find(
      (user) => user.id.toLowerCase() === dataUserFind.toLowerCase()
    );

    if (!foundUser) {
      throw new Error(
        "USER NOT FOUND IN DATA USERS, UPDATE-USER REQUEST HAS FAILED"
      );
    }

    // En caso que se quiera modificar el email, se verifica que no exista antes, ya que debe ser unico en el sistema
    const foundEmail = dataUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (
      !foundEmail ||
      foundEmail.email.toLowerCase() === foundUser.email.toLowerCase()
    ) {
      foundUser.firstName = firstName;
      foundUser.lastName = lastName;
      foundUser.email = email;
      if (!compareHashPassword(password, foundUser.password)) {
        foundUser.password = hashPassword(password);
      }

      writeFileSync(DATA_USERS, JSON.stringify(dataUsers));

      handleError(new Error("USER UPDATED"), LOG_FILE);
    } else {
      throw new Error(
        "EMAIL USER MUST BE UNIQUE IN DATA USERS, UPDATE-USER REQUEST HAS FAILED"
      );
    }

    return {
      id: foundUser.id,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      email: foundUser.email,
    };
  } catch (error) {
    handleError(error, ERROR_FILE);
    return error.message;
  }
};

const changeStatusLoggIn = (email) => {
  try {
    if (!email) {
      throw new Error("EMAIL IS MISSING");
    }

    if (!validateEmail(email)) {
      throw new Error(
        "EMAIL FORMAT INVALID, CHANGE-STATUS-LOGGIN REQUEST HAS FAILED"
      );
    }

    const dataUsers = getUsers();

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
    handleError(error, ERROR_FILE);
    return error.message;
  }
};

const changePassword = (userData) => {
  try {
    if (userData.length != 4) {
      throw new Error("INVALID ARGUMENTS, USE HELP FOR MORE INFORMATION");
    }

    const { email, currentPassword, newPassword } =
      createChangePasswordUserObject(userData); //destructuring

    if (!validateEmail(email)) {
      throw new Error(
        "EMAIL FORMAT INVALID, CHANGE-PASWWORD REQUEST HAS FAILED"
      );
    }

    const dataUsers = getUsers();

    const foundUser = dataUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (!foundUser) {
      throw new Error(
        "USER NOT FOUND IN DATA USERS, CHANGE-PASWWORD REQUEST HAS FAILED"
      );
    }

    if (!compareHashPassword(currentPassword, foundUser.password)) {
      throw new Error("PASSWORD INCORRECT, CHANGE-PASSWORD REQUEST HAS FAILED");
    }

    foundUser.password = hashPassword(newPassword);

    writeFileSync(DATA_USERS, JSON.stringify(dataUsers));

    handleError(new Error("PASSWORD CHANGE SUCCESSFULLY"), LOG_FILE);

    return "PASSWORD CHANGE SUCCESSFULLY";
  } catch (error) {
    handleError(error, ERROR_FILE);
    return error.message;
  }
};

const logIn = (userData) => {
  try {
    if (userData.length != 3) {
      throw new Error("INVALID ARGUMENTS, USE HELP FOR MORE INFORMATION");
    }

    const { email, password } = createLoginUserObject(userData); //destructuring

    if (!validateEmail(email)) {
      throw new Error("EMAIL FORMAT INVALID, LOGIN REQUEST HAS FAILED");
    }

    const dataUsers = getUsers();

    const foundUser = dataUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (!foundUser) {
      throw new Error("USER NOT FOUND IN DATA USERS, LOGIN REQUEST HAS FAILED");
    }

    if (!compareHashPassword(password, foundUser.password)) {
      throw new Error("PASSWORD INCORRECT, LOGIN REQUEST HAS FAILED");
    }

    foundUser.lastName = true;

    writeFileSync(DATA_USERS, JSON.stringify(dataUsers));

    handleError(new Error("LOGIN SUCCESS"), LOG_FILE);

    return "LOGIN SUCCESS";
  } catch (error) {
    handleError(error, ERROR_FILE);
    return error.message;
  }
};

const deleteUser = (argv) => {
  try {
    if (!argv) {
      throw new Error("ID/EMAIL IS MISSING");
    }

    const dataUsers = getUsers();

    const foundUser = dataUsers.find(
      (user) =>
        user.id === argv || user.email.toLowerCase() === argv.toLowerCase()
    );

    if (!foundUser) {
      throw new Error("USER NOT FOUND IN DATA USERS");
    }

    const newDataUsers = dataUsers.filter(
      (user) =>
        user.email.toLowerCase() !== argv.toLowerCase() && user.id !== argv
    );

    writeFileSync(DATA_USERS, JSON.stringify(newDataUsers));

    handleError(new Error("DELETE USER SUCCESS"), LOG_FILE);

    return foundUser;
  } catch (error) {
    handleError(error, ERROR_FILE);
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
  changePassword,
  changeStatusLoggIn,
  logIn,
  deleteUser,
  help,
};
