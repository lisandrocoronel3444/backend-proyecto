import { Router } from "express";
import { check } from "express-validator";
import {
  listarUsuarios,
  crearUsuario,
  login,
} from "../controllers/usuario.controllers.js";
import validarJWT from "../helpers/token-verify.js";

const router = Router();

// Ruta de login (pública)
router.post("/", login);

// Ruta para crear un nuevo usuario (pública)
router.post(
  "/nuevo",
  [
    check("nombreUsuario").notEmpty().withMessage("El nombre es obligatorio"),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe de ser de 8 caracteres")
      .isLength({ min: 8, max: 15 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .withMessage(
        "El password debe contener 8 caracteres (al menos 1 letra mayúscula, 1 letra minúscula y 1 número). También puede incluir caracteres especiales"
      ),
  ],
  crearUsuario
);

// Ruta para listar usuarios (solo accesible para administradores)
router.get([validarJWT], listarUsuarios);

export default router;
