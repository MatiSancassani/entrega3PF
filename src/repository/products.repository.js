import { ProductDao } from "../dao/factory.js";

export const getAllProducts = async (req) => await ProductDao.getAllProducts(req);
export const getProductById = async (pid) => await ProductDao.getProductById(pid);
export const addProduct = async (req) => await ProductDao.addProduct(req);
export const updateProduct = async (pid, rest) => await ProductDao.updateProduct(pid, rest);
export const removeProduct = async (pid) => await ProductDao.removeProduct(pid);