import mongoose from "mongoose";
import 'dotenv/config';

const cadenaDeConexion = process.env.DATABASE_URI;
mongoose.connect(cadenaDeConexion);

const datosConexion = mongoose.connection;

datosConexion.once('open', ()=>{console.log("bd conectada")});