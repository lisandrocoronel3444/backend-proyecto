import mongoose, { Schema } from "mongoose";

const pedidoSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true,
  },
  productos: [
    {
      nombreProducto: {
        type: String,
        required: true,
      },
      precio: {
        type: Number,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      }

    },
  ],
  estado: {
    type: String,
    enum: ['Pendiente', 'Enviado'], 
    default: 'Pendiente'
  },
  total: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

const Pedido = mongoose.model("pedido", pedidoSchema);
export default Pedido;
