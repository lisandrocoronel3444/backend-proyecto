import Pedido from "../models/pedido.js";

// Función para crear un nuevo pedido
export const crearPedido = async (req, res) => {
  try {
    const { nombreUsuario, productos, total, estado } = req.body;
    console.log("Datos recibidos:", { nombreUsuario, productos, total, estado });

    if (!nombreUsuario || !productos || !total) {
      return res.status(400).json({
        mensaje: "Faltan datos necesarios para crear el pedido",
      });
    }

    const nuevoPedido = new Pedido({
      nombreUsuario,
      productos,
      total,
      estado: estado || 'Pendiente', // Si no se pasa el estado, usa 'pendiente' por defecto
    });

    await nuevoPedido.save();

    res.status(201).json({
      mensaje: "Pedido realizado con éxito",
      pedido: nuevoPedido,
    });
  } catch (error) {
    console.log("Error al crear el pedido:", error);
    res.status(500).json({
      mensaje: "Error al realizar el pedido",
    });
  }
};

export const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.status(200).json(pedidos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al obtener los pedidos",
    });
  }
};

export const obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) {
      return res.status(404).json({
        mensaje: "Pedido no encontrado",
      });
    }
    res.status(200).json(pedido);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al obtener el pedido",
    });
  }
};

export const cambiarEstadoPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const estadosPermitidos = ['Pendiente', 'Enviado'];
    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({ mensaje: 'Estado no válido' });
    }

    const pedido = await Pedido.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }

    res.status(200).json({ mensaje: 'Estado del pedido actualizado', pedido });
  } catch (error) {
    console.log("Error al cambiar el estado del pedido:", error);
    res.status(500).json({ mensaje: 'Error al actualizar el estado del pedido' });
  }
};

export const eliminarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    
    const pedido = await Pedido.findByIdAndDelete(id);
    
    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    
    res.status(200).json({ mensaje: "Pedido eliminado con éxito" });
  } catch (error) {
    console.log("Error al eliminar el pedido:", error);
    res.status(500).json({
      mensaje: "Error al eliminar el pedido",
    });
  }
};
