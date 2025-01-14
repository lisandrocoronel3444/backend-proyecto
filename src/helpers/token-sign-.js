import jwt from 'jsonwebtoken'

// Se puede utilizar un secreto más seguro en el entorno de producción
const generarJWT = (nombreUsuario)=>{
    return new Promise((resolve, reject)=>{
        const payload = {nombreUsuario};
        jwt.sign(payload, process.env.SECRET_JWT,{
            expiresIn:'1h'
        }, (err, token) =>{
            if(err){
                console.log(err)
                reject('No se pudo generar el token');
            }
            resolve(token)
        })
    })
}

export default generarJWT