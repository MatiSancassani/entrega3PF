// import { UsersRepository } from "../../repository/index.js";
import usersModel from "./models/users.model.js";

export const getUserById = async (id) => await usersModel.findById(id);

export const getUserByEmail = async (email) => await usersModel.findOne({email});

export const registerUser = async (user) => await usersModel.create({...user});
