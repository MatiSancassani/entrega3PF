import { request, response } from 'express';
import config from '../config.js';
import { CartsRepository } from '../repository/index.js'

export const getCartById = async (req = request, res= response) => {
    try {
        const { cid } = req.params;
        // const cart = await getCartByIdService(cid); //Traemos todas las propiedades dentro del cart
        const cart = await CartsRepository.getCartById(cid);
        
        res.status(200).send({ origin: config.SERVER, payload: { cart }});         
    } catch (err) {
        console.log('getCartById ->', err)
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
};

export const addCart = async (req = request, res= response) => {
    try {
        // const cart = await addCartService()
        const cart = await CartsRepository.createCart();
        res.status(200).send({ origin: config.SERVER, payload: cart });
    } catch (err) {
        console.log('addCart ->', err)
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
};

export const addProductInCart = async (req = request, res= response) => {
    try {
        const { cid, pid } = req.params;

        // const cart = await addProductInCartService(cid, pid);
        const cart = await CartsRepository.addProductInCart(cid, pid);
        

        if (!cart) {
            console.log('El carrito no existe')
        }

        res.status(200).send({ origin: config.SERVER, payload:  cart });
    } catch (err) {
        console.log('addProductInCart ->', err);
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
};

export const updateProductInCart = async (req = request, res= response) => {
    try {

        const { cid, pid } = req.params;
        const { quantity } = req.body;
        if (!quantity || !Number.isInteger(quantity)) {
            console.log('Debe ser un numero entero')
        }
        // const cart = await updateProductInCartService(cid, pid, quantity);
        const cart = await CartsRepository.updateProductInCart(cid, pid, quantity);
        res.status(200).send({ origin: config.SERVER, payload: { cart } });
    } catch (err) {
        console.log('deleteProductInCart ->', err)
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
};

export const deleteProductInCart = async (req = request, res= response) => {
    try {
        const { cid, pid } = req.params;
        // const cart = await deleteProductInCartService(cid,pid);
        const cart = await CartsRepository.deleteProductInCart(cid, pid);
        

        res.status(200).send({ origin: config.SERVER, payload: { cart } });
    } catch (err) {
        console.log('deleteProductInCart ->', err)
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
};

export const deleteAllProducts = async (req = request, res= response) => {
    try {
        const { cid } = req.params;
        // const cart = await deleteAllProductsService(cid);
        const cart = await CartsRepository.deleteAllProducts(cid);
        
        // const cart = await cartModel.findByIdAndDelete(cid); // Eliminariamos todo el carrito
        res.status(200).send({ origin: config.SERVER, payload: { cart } });

    } catch (err) {
        console.log('deleteAllProducts ->', err)
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
};



