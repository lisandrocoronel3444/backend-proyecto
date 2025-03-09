// import generarJWT from "../helpers/jwt";
import generarJWT from "../helpers/token-sign-.js";
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt"
export const crearUsuario = async (req, res) => {
  try {
    const { email, password, rol } = req.body;

    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        mensaje: "Ya existe un usuario con el correo enviado",
      });
    }

    usuario = new Usuario({
      ...req.body,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      rol: rol || "operador" // Si no se envía un rol, será operador por defecto
    });

    await usuario.save();
    
    res.status(201).json({
      mensaje: "Usuario creado",
      nombreUsuario: usuario.nombreUsuario,
      uid: usuario._id,
      rol: usuario.rol // Enviar el rol en la respuesta
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "El usuario no pudo ser creado",
    });
  }
};


export const listarUsuarios = async (req, res) => {

  try {
    
    const usuarios = await Usuario.find();
  
    res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Error al buscar los usuarios",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Correo o password inválido"
      });
    }

    const passwordValido = bcrypt.compareSync(password, usuario.password);
    if (!passwordValido) {
      return res.status(404).json({
        mensaje: "Correo o password inválido"
      });
    }

    // Generar token incluyendo el rol
    const token = await generarJWT(usuario.nombreUsuario, usuario.rol);

    res.status(200).json({
      mensaje: "Usuario correcto",
      nombreUsuario: usuario.nombreUsuario,
      token,
      rol: usuario.rol // Enviar el rol en la respuesta
    });

  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "Usuario o password incorrectos"
    });
  }
};

