import { Router } from "express";
import {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  cambiarEstadoPedido,
  eliminarPedido,
} from "../controllers/pedido.controllers.js";
import validarJWT from "../helpers/token-verify.js";

const router = Router();

// Rutas de pedidos
router
  .route("/")
  .get([validarJWT], obtenerPedidos) 
  .post([validarJWT], crearPedido); 

router
  .route("/:id")
  .get([validarJWT], obtenerPedidoPorId) 
  .put([validarJWT], cambiarEstadoPedido) 
  .delete([validarJWT], eliminarPedido); 

export default router;
