import Producto from "../models/producto.js";
export const crearProducto = async (req, res) => {
  try {
    

    const ProductoNuevo = new Producto(req.body);
    await ProductoNuevo.save();
    res.status(201).json({
      mensaje: "El producto fue creado con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "Error al intentar crear el producto",
    });
  }
};
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al obtener productos",
    });
  }
};

export const obtenerUnProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    res.status(200).json(producto);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al obtener el producto",
    });
  }
};

export const borrarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.status(200).json({
      mensaje: "El producto fue eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error no se pudo borrar el producto",
    });
  }
};
export const editarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      mensaje: "Producto actualizado con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error no se pudo actualizar el producto",
    });
  }
};
