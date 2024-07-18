import { Router } from 'express';
import passport from 'passport';


import { loginGet, login, logout, registerGet, registerPost } from '../controllers/users.controllers.js';

const router = Router();

router.get('/login', loginGet);
router.post('/login',passport.authenticate('login', {failureRedirect: `/login?error=${encodeURI('Usuario o clave invalidos')}`}),login)
router.get('/register', registerGet);
router.post('/register',passport.authenticate('register', {failureRedirect:'/register'}) ,registerPost);
router.get('/logout', logout); 

router.get('/current', async(req, res) => {
    try {
        const user = { ...req.session.user };
        delete user.password;

        res.status(200).send({
            user: user,
            login_type: user.login_type 
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

export default router;