import jwt from 'jsonwebtoken';
import config from '../config.js';

export const generateToken = () => {
     try {
        const token = jwt.sign({user},config.JWT_SECRET_KEY, {expiresIn: '8h' })
        return token;
     } catch (error) {
        console.log(error)
        throw error;
     }
}