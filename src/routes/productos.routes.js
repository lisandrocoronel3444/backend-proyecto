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
  .post([validarJWT, validacionProducto], crearProducto) // Ya protegido
  .get(obtenerProductos); // Público si es para mostrar a los clientes

router
  .route("/:id")
  .get(obtenerUnProducto) // Público si es para mostrar a los clientes
  .delete([validarJWT], borrarProducto) // Agregar validarJWT
  .put([validarJWT, validacionProducto], editarProducto); // Agregar validarJWT


export default router;
