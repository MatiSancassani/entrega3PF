import { request, response } from "express";
import config from "../config.js";
import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';

export const verifyAuthoentication = (req = request, res = response, next) => {

    if (!req.user) return res.status(401).send({ origin: config.SERVER, payload: 'Usuario no autenticado' });

    return next();
}

export const isAdmin = (req = request, res = response, next) => {
   
    if (req.session.user?.rol !== 'admin') return res.status(403).send({ origin: config.SERVER, payload: 'No tiene permisos para acceder al recurso' });
            
    next();

}

export const isUser = (req = request, res = response, next) => {
   
    if (req.session.user?.rol !== 'user') return res.status(403).send({ origin: config.SERVER, payload: 'No tiene cuenta para agregar productos' });
            
    next();

}



export const validateFields = (req = request, res = response, next) => {
    const err = validationResult(req);
    if(!err.isEmpty()) {
        return res.status(400).send(err)
    } 
    next();

}

export const validateJWT = (req = request, res = response, next) => {
    // console.log(req.header('Authorization'))
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token){
        return res.status(401).send({msg: 'No hay token en la peticion'})
    }
    try {
        const { _id, email } = jwt.verify(token, config.JWT_SECRET_KEY);
        req._id = _id;
        req.email = email;
    } catch (error) {
        console.log(error)
        return res.status(401).send({msg: 'Token no valido'})
    }

    next();

}
