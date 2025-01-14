import { Router } from "express";
import {
  borrarProducto,
  crearProducto,
  editarProducto,
  obtenerProductos,
  obtenerUnProducto,
} from "../controllers/productos.controllers.js";

import validacionProducto from "../helpers/validarProducto.js";
import validarJWT from "../helpers/token-verify.js";

const router = Router();

router
  .route("/")
  .post([validarJWT, validacionProducto], crearProducto) 
  .get(obtenerProductos); 

router
  .route("/:id")
  .get(obtenerUnProducto)
  .delete([validarJWT], borrarProducto) 
  .put([validarJWT, validacionProducto], editarProducto); 


export default router;
