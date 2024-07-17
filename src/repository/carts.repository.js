import { CartDao } from "../dao/factory.js";

export const getCartById = async (cid) => await CartDao.getCartById(cid);
export const createCart = async () => await CartDao.createCart();
export const addProductInCart = async (cid, pid) => await CartDao.addProductInCart(cid, pid);
export const updateProductInCart = async (cid, pid, quantity) => await CartDao.updateProductInCart(cid, pid, quantity);
export const deleteProductInCart = async (cid, pid) => await CartDao.deleteProductInCart(cid, pid);
export const deleteAllProducts = async (cid) => await CartDao.deleteAllProducts(cid);
