// import generarJWT from "../helpers/jwt";
import generarJWT from "../helpers/token-sign-.js";
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt"
export const crearUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    let usuario = await Usuario.findOne({ email }); 
    
    if (usuario) {
   
      return res.status(400).json({
        mensaje: "ya existe un usuario con el correo enviado",
      });
    }

    usuario = new Usuario(req.body);
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password,salt)
    await usuario.save();
    res.status(201).json({
      mensaje: "usuario creado",
      nombre: usuario.nombre,
      uid: usuario._id,
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

export const login = async(req, res)=>{
  try {
    const {email, password} = req.body;
    let usuario = await Usuario.findOne({email : email});
    if(!usuario){
      return res.status(404).json({
        mensaje: "Correo o password invalido"
      })
    }
    const passwordValido = bcrypt.compareSync(password, usuario.password)
    if(!passwordValido){
      return res.status(404).json({
        mensaje: "Correo o password invalido"
      })
    }
    //genero token
    const token = await generarJWT(usuario.nombreUsuario);



    res.status(200).json({
      mensaje: "usuario correcto",
      nombreUsuario: usuario.nombreUsuario,
      token
    })
    
  } catch (error) {
    console.log(error)
    res.status(404).json({
      mensaje: "Usuario o password incorrectos"
     
    });
  }
}