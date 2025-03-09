import { Router } from "express";
import { check } from "express-validator";
import {
  listarUsuarios,
  crearUsuario,
  login,
} from "../controllers/usuario.controllers.js";
import validarJWT from "../helpers/token-verify.js";

const router = Router();

// Rutas públicas
router
  .route("/")
  .post(login); // Inicio de sesión (no requiere JWT)

router
  .route("/nuevo")
  .post(
    [
      check("nombreUsuario").notEmpty().withMessage("El nombre es obligatorio"),
      check("email", "El email es obligatorio").isEmail(),
      check("password", "El password debe de ser de 6 caracteres")
        .isLength({
          min: 6,
          max: 15,
        })
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        .withMessage(
          "El password debe contener 8 caracteres (al menos 1 letra mayúscula, 1 letra minúscula y 1 numero) también puede incluir carácteres especiales"
        ),
    ],
    crearUsuario
  ); // Registro (no requiere JWT)

// Rutas protegidas
router
  .route("/")
  .get([validarJWT], listarUsuarios); // Solo usuarios autenticados pueden listar usuarios

export default router;