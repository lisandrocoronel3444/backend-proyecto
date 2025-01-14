import express from 'express';
import cors from 'cors'
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import './src/database/dbConnection.js';
import productosRouter from './src/routes/productos.routes';
import usuarioRouter from './src/routes/usuarios.routes';
import pedidosRouter from './src/routes/pedidos.routes'

dotenv.config();
//configurar un puerto
//crear una instancia de express
const app = express();

app.set('PORT', process.env.PORT || 4000);

app.listen(app.get('PORT'), ()=>{
    console.log('Estoy en el puerto '+ app.get('PORT'))
});

//middlewares: funciones que se ejecutan antes de las rutas
app.use(express.json());//permite interpretar el formato json en un request
app.use(express.urlencoded({ extended:true})); //permite interpretar string y arrays del request
app.use(cors()); //permite conexiones remotas
app.use(morgan('dev')); //me da info extra en la terminal
//cargar un archivo estatico
console.log(path.join(__dirname, '/public'));
app.use(express.static(path.join(__dirname, '/public')));

// Rutas
app.use("/proyecto/productos", productosRouter);
app.use("/proyecto/auth", usuarioRouter);
app.use("/proyecto/pedidos", pedidosRouter);

