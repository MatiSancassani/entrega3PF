import { UsersRepository } from "../repository/index.js";

export const emailAlreadyExists = async (email) => {    
        const emailInUse = await UsersRepository.getUserByEmail(email);
        if (emailInUse) 
            throw new Error(`Email ${email} in use`);    
}