import { Router } from "express";
import { getCartById, 
        // addCart, 
        addProductInCart, 
        deleteProductInCart, 
        updateProductInCart, 
        deleteAllProducts } from "../controllers/carts.controllers.js";
// import { validateJWT } from '../middleware/auth.js'

const router = Router();

router.get('/:cid', getCartById )
// router.post('/', addCart )
router.post('/:cid/product/:pid', addProductInCart )
router.put('/:cid/products/:pid', updateProductInCart)
router.delete('/:cid/products/:pid', deleteProductInCart )
router.delete('/:cid', deleteAllProducts)


// router.get('/:cid', validateJWT, getCartById )
// // router.post('/', validateJWT, addCart )
// router.post('/:cid/product/:pid', validateJWT, addProductInCart )
// router.put('/:cid/products/:pid', validateJWT, updateProductInCart)
// router.delete('/:cid/products/:pid', validateJWT, deleteProductInCart )
// router.delete('/:cid', validateJWT, deleteAllProducts)
// export default router;

export default router;