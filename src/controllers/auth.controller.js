// import { request, response } from 'express';
// import config from '../config.js';
// import { UsersRepository, CartsRepository } from '../repository/index.js';
// import {createHash, isValidPassword} from '../utils/bcryptPassword.js'
// import {generateToken} from '../utils/jwt.js'

// export const createUser = async (req = request, res= response) => {
//     try {
//         req.body.password = createHash(req.body.password);
        
//         const cart = await CartsRepository.createCart();
//         console.log(cart)
//         req.body.cart_id = cart._id;

//         const response = await UsersRepository.registerUser(req.body);



//         const {_id, name, lastName, email, rol} = response
//         const jwt = generateToken({_id, name, lastName, email, rol});

//         res.status(200).send({ origin: config.SERVER, payload: response, jwt });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
//     }
// };

// export const loginUser = async (req = request, res= response) => {
//     try {
//         const {email, password} = req.body;

//         const user = await UsersRepository.getUserByEmail(email);
//         if(!user) return res.status(400).send({msg: 'Email incorrecto'});

//         const validPassword = isValidPassword(password, user.password);
//         if(!validPassword) return res.status(400).send({msg: 'Password incorrecta'});

//         const {_id, name, lastName, rol} = response;
//         const jwt = generateToken({_id, name, lastName, email, rol});
 
//         res.status(200).send({ origin: config.SERVER, payload: 'User login', response, jwt});
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
//     }
// };