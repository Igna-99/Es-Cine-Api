import { Pelicula } from "../models/index.js";

class PeliculaController {

    constructor() { }

    traerTodasLasPeliculas = async (req, res, next) => {
        try {
            const result = await Pelicula.findAll({
                attributes: ["idPelicula"]
            });

            if (result.length == 0) {
                const error = new Error("No hay peliculas cargadas");
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: "id de peliculas:", result })

        } catch (error) {
            next(error)
        }
    };
};

export default PeliculaController;