import { Router } from 'express';
import { getAll, getById, add, update, remove } from '../controllers/products.controllers.js';


const router = Router();

router.get('/', getAll);
router.get('/:pid', getById);
router.post('/', add);
router.put('/:pid', update);
router.delete('/:pid', remove);

export default router;
