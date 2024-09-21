import { createHash } from "node:crypto";

const createNewUserObject = (args) => {
  return {
    firstName: args[1],
    lastName: args[2],
    email: args[3],
    password: args[4],
    isLoggedIn: false,
  };
};

const createUpdateUserObject = (args) => {
  return {
    firstName: args[2],
    lastName: args[3],
    email: args[4],
    password: args[5],
  };
};

const createChangePasswordUserObject = (args) => {
  return {
    email: args[1],
    currentPassword: args[2],
    newPassword: args[3],
  };
};

const createLoginUserObject = (args) => {
  return {
    email: args[1],
    password: args[2],
  };
};

const validateEmail = (email) => {
  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  if (validEmail.test(email)) {
    return true;
  }
  return false;
};

const hashPassword = (password) => {
  return createHash("sha256").update(password).digest("hex");
};

const compareHashPassword = (password, hashedPassword) => {
  if (hashPassword(password) === hashedPassword) {
    return true;
  }
  return false;
};

export {
  createNewUserObject,
  createUpdateUserObject,
  validateEmail,
  hashPassword,
  compareHashPassword,
  createChangePasswordUserObject,
  createLoginUserObject,
};
