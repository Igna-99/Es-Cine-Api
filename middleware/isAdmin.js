import { verifyToken } from "../utils/tokens.js";

const idAdmin = (req, res, next) => {
    try {

        const { tokenCine } = req.cookies;

        const { payload } = verifyToken(tokenCine);

        if (payload.idRol != 1) {
            const error = new Error("Necesitas ser Admin para hacer eso")
            error.status = 400;
            throw error;
        };

        next();


    } catch (error) {
        next(error);
    }
    
};

export default idAdmin;