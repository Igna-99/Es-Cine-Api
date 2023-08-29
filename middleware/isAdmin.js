import { verifyToken } from "../utils/tokens.js";
import { Usuario } from "../models/index.js";


const isAdmin = async (req, res, next) => {
    try {

        const { tokenCine } = req.cookies;

        const { payload } = verifyToken(tokenCine);

        if (payload.idRol != 1) {
            const error = new Error("Necesitas ser Admin para hacer eso")
            error.status = 400;
            throw error;
        };

        const result = await Usuario.findOne({
            attributes: ["idUsuario", "email", "habilitado","idRol"],
            where: {
                idUsuario: payload.idUsuario
            },
        });

        if (result.idRol != 1) {
            const error = new Error("Su Permiso de Administrador fue Revocado recientemente, Porfavor inicie sesion nuevamente")
            error.status = 400;
            throw error;
        };

        next();

    } catch (error) {
        next(error);
    }
    
};

export default isAdmin;