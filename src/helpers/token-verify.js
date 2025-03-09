import jwt from 'jsonwebtoken';

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            mensaje: 'No hay token en la petición'
        });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT);
        req.nombreUsuario = payload.nombreUsuario; 
        req.rol = payload.rol; // Agregar el rol a la request

    } catch (error) {
        console.log(error);
        return res.status(401).json({ mensaje: 'El token no es válido' });
    }

    next(); 
};

export default validarJWT;
