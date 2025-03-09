import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema({
    nombreUsuario: {
        type: String,
        maxlength: 30,
        required: true
    },
    email: {
        type: String,
        maxlength: 200,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['operador', 'admin'],  // Solo puede ser 'operador' o 'admin'
        default: 'operador'  // Por defecto será 'operador'
    }
});

const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;
