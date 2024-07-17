import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import FileStore from 'session-file-store' Al usar almancenamiento en mongo desabilitamos, si queremos almacenar en archivo activamos

import config from './config.js';
import initSocket from './socket.js';


import productsRoutes from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js';
import sessionRoutes from './routes/session.routes.js';
import authRoutes from './routes/auth.routes.js'


const app = express();
// const fileStorage = fileStorage(session); Habilitamos si necesitamos almacenar archivo


const expressInstance = app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGODB_URI);

    const socketServer = initSocket(expressInstance);
    app.set('socketServer', socketServer);

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true})); 
    app.use(cookieParser(config.SECRET));


    app.use('/api/auth', authRoutes)
    app.use('/api/sessions', sessionRoutes);
    app.use('/api/products', productsRoutes);
    app.use('/api/carts', cartsRouter);
    app.use('/static', express.static(`${config.DIRNAME}/public`));

    console.log(`Servidor activo en http://localhost:${config.PORT}`)
});



