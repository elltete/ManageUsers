import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
import "dotenv/config";
import { handleError } from "./utils/handleError.js";

const DATA_USERS = process.env.DATA_USERS;
const LOG_FILE = process.env.LOG_FILE;
const DATA_HELP = process.env.DATA_HELP;

const getUsers = () => {
  try {
    //leer el archivo y mostrarlo

    const existsFile = existsSync(DATA_USERS);

    if (!existsFile) {
      writeFileSync(DATA_USERS, JSON.stringify([]));
      throw new Error("CREATING DATA USERS FILE");
    }

    const dataUsers = JSON.parse(readFileSync(DATA_USERS));

    return dataUsers;

  } catch (error) {
    handleError(error, LOG_FILE);
    return error.message;
  }
};

const getInfoUsers = () => {
  try {
  } catch (error) {}
};

const getUsersbyId = (id) => {
  try {
  } catch (error) {}
};

const getUsersbyEmail = (email) => {
  try {
  } catch (error) {}
};

const addUser = (userData) => {
  try {
  } catch (error) {}
};

const updateUser = (userData) => {
  try {
  } catch (error) {}
};

const changeStatusLoggIn = () => {
  try {
  } catch (error) {}
};

const logIn = (userData) => {
  try {
  } catch (error) {}
};

const deleteUser = (id) => {
  try {
  } catch (error) {}
};

const help = () => {
  try {
    const exist = existsSync(DATA_HELP);
    
    if (!exist) {
      throw new Error("HELP FILE NOT EXIST");
    }

    const dataHelp = readFileSync(DATA_HELP, "utf-8");

    return (dataHelp);

  } catch (error) {
    handleError(error, LOG_FILE);
    return error.message;
  }
};

export {
  getUsers,
  getInfoUsers,
  getUsersbyId,
  getUsersbyEmail,
  addUser,
  updateUser,
  changeStatusLoggIn,
  logIn,
  deleteUser,
  help,
};
