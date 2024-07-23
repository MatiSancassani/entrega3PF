import cartModel from "./models/carts.model.js";
import ticketModel from "./models/ticket.model.js";


export const getCartById = async (cid) => 
    await cartModel.findById(cid).populate('products.id').lean(); //Traemos todas las propiedades dentro del cart

export const createCart = async () => 
    await cartModel.create({});


export const addProductInCart = async (cid, pid) => {
        const cart = await cartModel.findById(cid)

        if (!cart) {
            return null;
        }
        const productInCart = cart.products.find(p => p.id.toString() === pid);

        if (productInCart)
            productInCart.quantity++;
         else 
            cart.products.push({ id: pid, quantity: 1 });

        cart.save();

        return cart;
};

export const updateProductInCart = async (cid, pid, quantity) => 
         await cartModel.findOneAndUpdate(
            {_id: cid, 'products.id': pid },
            {$set: {'products.$.quantity' :quantity}},
            {new: true} 
);

export const deleteProductInCart = async (cid, pid) => 
    await cartModel.findByIdAndUpdate(cid, {$pull:{'products':{id:pid}}}, { new: true });


export const deleteAllProducts = async (cid) => 
    await cartModel.findByIdAndUpdate(cid, {$set:{'products':[]}}, { new: true });
    //  await cartModel.findByIdAndDelete(cid); // Eliminariamos todo el carrito

export const addTicket = async (ticket) => await ticketModel.create(ticket);