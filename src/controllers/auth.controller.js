import { request, response } from 'express';
import config from '../config.js';
import { UsersRepository } from '../repository/index.js';

export const createUser = async (req = request, res= response) => {
    try {
        const response = await UsersRepository.registerUser(req.body)
        res.status(200).send({ origin: config.SERVER, payload: response });
    } catch (err) {
        console.log(err);
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
};

export const loginUser = async (req = request, res= response) => {
    try {
        res.status(200).send({ origin: config.SERVER, payload: 'User login'});
    } catch (err) {
        console.log(err);
        res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
    }
};