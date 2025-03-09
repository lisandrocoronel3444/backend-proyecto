import jwt from 'jsonwebtoken';

const generarJWT = (nombreUsuario, rol) => {
    return new Promise((resolve, reject) => {
        const payload = { nombreUsuario, rol }; // Agregamos el rol al payload

        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '1h' // Tiempo de expiración del token
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve(token);
        });
    });
};

export default generarJWT;
