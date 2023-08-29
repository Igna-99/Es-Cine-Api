import { verifyToken } from "../utils/tokens.js";

const validateAccess = (req, res, next) => {
    try {

        const { tokenCine } = req.cookies;
        
        if (!tokenCine) {
            const error = new Error("no hay cookie")
            error.status = 400;
            throw error;
        };

        const { payload } = verifyToken(tokenCine);

        if (!tokenCine) {
            const error = new Error("no hoy payload")
            error.status = 400;
            throw error;
        };
    
        req.user = payload;

        next()

    } catch (error) {

        if (error.message == 'jwt expired') {
            res.cookie('tokenCine', '');
            error.message = 'JWT expired, Cookie Eliminada'
        }
        
        next(error);
    }

};

export default validateAccess;