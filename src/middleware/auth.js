import { request, response } from "express";
import config from "../config.js";
import {validationResult} from 'express-validator';


export const verifyAuthoentication = (req = request, res = response, next) => {

    if (!req.user) return res.status(401).send({ origin: config.SERVER, payload: 'Usuario no autenticado' });

    return next();
}

export const verifyAuthorization = (req = request, res = response, next) => {
   
    if (req.session.user?.rol !== 'admin') return res.status(403).send({ origin: config.SERVER, payload: 'No tiene permisos para acceder al recurso' });
            
    next();

}

export const validateFields = (req = request, res = response, next) => {
    const err = validationResult(req);
    if(!err.isEmpty()) {
        return res.status(400).send(err)
    } 
    next();

}

