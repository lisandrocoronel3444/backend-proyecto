const validarAdmin = (req, res, next) => {
    if (req.rol !== 'admin') {
        return res.status(403).json({
            mensaje: 'No tienes permisos para acceder a esta ruta'
        });
    }
    next();
};

export default validarAdmin;
