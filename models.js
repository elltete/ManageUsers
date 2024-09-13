import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { randomUUID, createHash } from "node:crypto";
import "dotenv/config";
import { handleError } from "./utils/handleError.js";

const LOG_FILE = process.env.LOG_FILE;
const DATA_HELP = process.env.DATA_HELP;

const getUsers = () => {
  try {
  } catch (error) {}
};

const getUsersbyId = (id) => {
  try {
  } catch (error) {}
};

const addUser = (userData) => {
  try {
  } catch (error) {}
};

const updateUser = (id, userData) => {
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
        throw new Error("Help file not exist");
      }

    const dataHelp = readFileSync(DATA_HELP, "utf-8");

    console.log(dataHelp);
  } catch (error) {
        handleError(error, LOG_FILE);
        return error.message;
  }
};

export { getUsers, getUsersbyId, addUser, updateUser, deleteUser, help };
