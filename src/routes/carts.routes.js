import { Router } from "express";
import { getCartById, 
        // addCart, 
        addProductInCart, 
        deleteProductInCart, 
        updateProductInCart, 
        deleteAllProducts,
        } from "../controllers/carts.controllers.js";
// import { validateJWT } from '../middleware/auth.js'
import { CartsRepository } from "../repository/index.js";
import { pucharseCart } from "../controllers/carts.controllers.js";
import {isUser} from '../middleware/auth.js'
import nodemailer from 'nodemailer';
import config from "../config.js";

const router = Router();

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.GMAIL_APP_USER,
        pass: config.GMAIL_APP_PASS
    }
});
router.get('/mail', async (req, res) => {
    try {
        // Utilizando el transporte, podemos enviar a través
        // del SMTP que hayamos configurado, mensajes vía email
        // a los destinatarios que deseemos
        const confirmation = await transport.sendMail({
            from: `Sistema Coder <${config.GMAIL_APP_USER}>`, // email origen
            to: 'matiassancassani@gmail.com',
            subject: 'Pruebas Nodemailer',
            html: '<h1>Prueba 01</h1>'
        });

        res.status(200).send({ status: 'OK', data: confirmation });
    } catch (err) {
        res.status(500).send({ status: 'ERR', data: err.message });
    }
});

router.get('/:cid', getCartById )
// router.post('/', addCart )
router.post('/:cid/product/:pid', addProductInCart )
router.put('/:cid/products/:pid', updateProductInCart)
router.delete('/:cid/products/:pid', deleteProductInCart )
router.delete('/:cid', deleteAllProducts)


router.post('/:cid/purchase', isUser ,async (req, res) => {        
            const cid = req.params.cid;
            const cart = await CartsRepository.getCartById(cid);
            if(cart) {
                const cartFiltered = await pucharseCart(cart);
                res.status(200).send({ status: 'Ok', payload: cartFiltered, mensaje: `Cierre del carrito con id ${cid}` });
            } else {
                res.status(400).send({ status: 'False', payload: [], error: `El carrito buscado con id ${cid} no existe` });
            }
});

// router.get('/:cid', validateJWT, getCartById )
// // router.post('/', validateJWT, addCart )
// router.post('/:cid/product/:pid', validateJWT, addProductInCart )
// router.put('/:cid/products/:pid', validateJWT, updateProductInCart)
// router.delete('/:cid/products/:pid', validateJWT, deleteProductInCart )
// router.delete('/:cid', validateJWT, deleteAllProducts)
// export default router;

export default router;