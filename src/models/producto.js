import mongoose, {Schema} from "mongoose";

const productoSchema = new Schema({
    nombreProducto:{
        type: String,
        required:true,
        unique: true,
        minLength: 2,
        maxLength: 70
    },
    precio:{
        type: Number,
        required: true,
        min: 1,
        max: 300000

    },
    img:{
        type: String,
        required: true
    },
    categoria:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    }
})
//singular porque mongodb le agrega una S al final para la coleccion
const Producto = mongoose.model('producto', productoSchema);
export default Producto