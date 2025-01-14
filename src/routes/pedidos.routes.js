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
  .get([validarJWT], obtenerPedidos) // Proteger con JWT (puede incluir un middleware adicional para validar roles)
  .post([validarJWT], crearPedido); // Solo usuarios autenticados pueden crear pedidos

router
  .route("/:id")
  .get([validarJWT], obtenerPedidoPorId) // Obtener un pedido específico (verificar propiedad si es necesario)
  .put([validarJWT], cambiarEstadoPedido) // Cambiar estado (proteger con un middleware de rol)
  .delete([validarJWT], eliminarPedido); // Eliminar pedido (proteger con un middleware de rol)

export default router;
