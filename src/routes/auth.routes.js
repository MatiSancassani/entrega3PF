import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.controller.js";
import  {check} from 'express-validator';
import {validateFields} from '../middleware/auth.js'
import { emailAlreadyExists } from "../helpers/db.validations.js";

const router = Router();

router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('lastName', 'LastName is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not a correct format').isEmail(),
    check('email').custom(emailAlreadyExists),
    check('password', 'Password is required').isLength({ min: 6 }),
    validateFields,
] ,createUser);

router.post('/login', [
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not a correct format').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 }),
    validateFields,
],loginUser);


export default router;