import { request, response } from 'express';
import config from '../config.js';
import { CartsRepository, UsersRepository, ProductsRepository } from '../repository/index.js'
import { v4 as uuidv4 } from 'uuid';




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

// export const addCart = async (req = request, res= response) => {
    // try {
        // const cart = await addCartService() va comentada esta linea
        // const cart = await CartsRepository.createCart();
        // res.status(200).send({ origin: config.SERVER, payload: cart });
    // } catch (err) {
        // console.log('addCart ->', err)
        // res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    // }
// };

export const addProductInCart = async (req = request, res= response) => {
    try {
        const { _id } = req;
        const { cid, pid } = req.params;

        const user = await UsersRepository.getUserById(_id);      
        const product = await ProductsRepository.getProductById(pid)

        // if(!(user.cart_id.toString() === cid)) return res.status(400).send( {msg: 'Cart no valido'});
        if(!product) return res.status(400).send( {msg: 'Product no existe'});

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

        const { _id } = req;
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const user = await UsersRepository.getUserById(_id);      
        const product = await ProductsRepository.getProductById(pid);
        if(!(user.cart_id.toString() === cid)) return res.status(400).send( {msg: 'Cart no valido'});
        if(!product) return res.status(400).send( {msg: 'Product no existe'});


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

        const { _id } = req;
        const { cid, pid } = req.params;


        const user = await UsersRepository.getUserById(_id);      
        const product = await ProductsRepository.getProductById(pid);
        if(!(user.cart_id.toString() === cid)) return res.status(400).send( {msg: 'Cart no valido'});
        if(!product) return res.status(400).send( {msg: 'Product no existe'});

        
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




export const pucharseCart = async(cart) => {
    try {
        let totalTicket = 0;
        let cartUpdate = [];

            for (let i = 0; i < cart.products.length; i++) {

                if (cart.products[i].id.stock >= cart.products[i].quantity) {
                    console.log('Si alcanza', cart.products[i]);


                    totalTicket =+ (cart.products[i].quantity * cart.products[i].id.price);
                    
                    const amountNewStock = cart.products[i].id.stock - cart.products[i].quantity
                    
                    const prodEdit = await ProductsRepository.updateProduct(cart.products[i].id._id, { stock: amountNewStock });
                    cartUpdate = cart.products.splice(i, 1);
                    i--; // Reduce el i para reajustarlo al haber quetado un elemento.

                } else {
                    console.log('There is not enough stock');
                }
            };
            if (totalTicket > 0) {
                const ticket = {
                    code: uuidv4(),
                    amount: totalTicket,
                    purchaser: "da"
                };

                const ticketAdd = await CartsRepository.addTicket(ticket);       
            }
            const cartResult = await CartsRepository.updateProductInCart();
            return cartResult;
        
    } catch (error) {
        console.log('Error when deleting complete the purchase');
        console.log(error);
    }
}









