import { Router } from 'express';
import { getAll, getById, add, update, remove } from '../controllers/products.controllers.js';
// import { validateJWT } from '../middleware/auth.js'
import { verifyAuthoentication, isAdmin, isUser } from '../middleware/auth.js';

const router = Router();

router.get('/',  getAll);
router.get('/:pid', getById);
router.post('/',verifyAuthoentication, isAdmin, add);
router.put('/:pid',verifyAuthoentication, isAdmin, update);
router.delete('/:pid',verifyAuthoentication, isAdmin, remove);


// router.get('/',validateJWT,  getAll);
// router.get('/:pid', validateJWT, getById);
// router.post('/', validateJWT, add);
// router.put('/:pid', validateJWT, update);
// router.delete('/:pid', validateJWT, remove);

export default router;
