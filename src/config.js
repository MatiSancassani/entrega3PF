import path from 'path';
import dotenv from 'dotenv';

dotenv.config({path: '../.env' });

const config = {
    PORT: 8080,
    SERVER: 'Server',
    DIRNAME: path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1')),
    // Esta función tipo getter nos permite configurar dinámicamente
    // la propiedad UPLOAD_DIR en base al valor de otra propiedad (DIRNAME)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` }, // Función getter\
    MONGODB_URI: ('mongodb+srv://matisancassani:mati123@cluster0.lcblgku.mongodb.net/SegundaPreEntrega'),
    // MONGODB_URI: ('mongodb+srv://matisancassani:M5i03s98@cluster0.lcblgku.mongodb.net/(nombre de la base de datos)')
    // 
    APP_NAME: 'token',
    PRODUCTS_PER_PAGE: 2,
    SECRET: 'cod3r',
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,

    
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,

    GMAIL_APP_USER:'matiassancassani@gmail.com',
    GMAIL_APP_PASS: process.env.GMAIL_APP_PASS,

}



export const errorsDictionary = {
    UNHANDLED_ERROR: {code:0, status: 500, message: 'Error no identifcado'},
    PRODUCTID_ERROR: {code: 1, status: 404, message: 'No se encuentra el producto'},
    NEW_USER_ERROR: {code: 2, status: 400, message: 'Faltan parametros obligatorios'},
    INVALID_FORMAT_PRODUCT: {code: 3, status: 400, message: 'No tiene un formato valido'},
    CART_INVALID_PARAMETERS: {code: 4, status: 400, message: 'Parameters ivalidS'},
    PAGE_NOT_FOUND: {code: 5, status: 404 , message: 'No se encuentra la pagina solicitada'},
    DATABASE_ERROR: {code: 6, status: 500, message: 'No se pudo conectar a la DB'},
    INTERNAL_ERROR: {code: 7, status: 500, message: 'Error interno del servidor'},
    CREATION_ERROR: {code: 8, status: 500, message: 'Error al crear el registro'}
}

export default config;