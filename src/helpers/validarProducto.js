import { check } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionProducto = [
    check("nombreProducto")
      .notEmpty()
      .withMessage("El nombre del producto es obligatorio")
      .isLength({ min: 2, max: 100 })
      .withMessage(
        "El nombre del producto debe tener entre 2 y 100 caracteres"
      ),
    check("precio")
      .notEmpty()
      .withMessage("El precio es obligatorio")
      .isNumeric()
      .withMessage("El precio debe ser un numero")
      .custom((value) => {
        if (value >= 1 && value <= 300000) {
          return true;
        } else {
          throw new Error("El precio debe estar entre 1 y 300000");
        }
      }),
    check("img")
      .notEmpty()
      .withMessage("La ulr de la imagen es un dato obligatorio")
      .matches(/^(http(s?):)([/|.|\w|\s|-])*\.(?:png|jpe?g|gif|svg)$/)
      .withMessage(
        "La imagen debe ser una url valida, terminada en (png|jpe?g|gif|svg)"
      ),
    check("categoria")
      .notEmpty()
      .withMessage("La categoria es un dato obligatorio")
      .isIn(["Pizzas", "Hamburguesas", "Bebidas", "Pastas", "Ensaladas"])
      .withMessage("La categoria debe ser una opcion valida"),
      (req,res,next )=>{resultadoValidacion(req,res,next)

      }
  ]
  export default validacionProducto;