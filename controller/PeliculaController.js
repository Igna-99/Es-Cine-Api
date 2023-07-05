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

    agregarPelicula = async (req, res, next) => {
        try {
            const { idPelicula } = req.body

            const result = await Pelicula.create({
                idPelicula
            });

            if (!result) {
                const error = new Error("No se puede crear una Pelicula con ese ID");
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: "Pelicula Creada:", result })

        } catch (error) {
            next(error)
        }
    };

    eliminarPelicula = async (req, res, next) => {
        try {
            const { idPelicula } = req.body

            const result = await Pelicula.destroy({
                where: {
                    idPelicula,
                }
            });

            if (!result) {
                const error = new Error("No se puedo Eliminar la pelicula");
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: "Pelicula Eliminada:", result })

        } catch (error) {
            next(error)
        }
    };
};

export default PeliculaController;