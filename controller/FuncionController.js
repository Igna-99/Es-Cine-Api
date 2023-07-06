import { Funcion } from "../models/index.js";
import { validDate, validTime } from "../utils/validateDateAndTime.js";

class FuncionController {

    constructor() { }

    traerTodasLasFunciones = async (req, res, next) => {
        try {
            const result = await Funcion.findAll({
                attributes: ['idFuncion', 'sala', 'horario', 'fecha', 'idPelicula']
            });

            if (result.length == 0) {
                const error = new Error("no hay Funciones cargadas");
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: "Funciones:", result })

        } catch (error) {
            next(error)
        }
    };

    traerFuncionesDeUnaSala = async (req, res, next) => {
        try {
            const { sala } = req.params;

            const result = await Funcion.findAll({
                attributes: ['idFuncion', 'sala', 'horario', 'fecha', 'idPelicula'],
                where: {
                    sala
                },
            });

            if (result.length == 0) {
                const error = new Error(`No hay Funciones Cargadas para la Sala ${sala}`);
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: `Funciones de la Sala ${sala}:`, result })

        } catch (error) {
            next(error)
        }
    };

    traerFuncionesDeUnaFecha = async (req, res, next) => {
        try {
            const { fecha } = req.params;

            const result = await Funcion.findAll({
                attributes: ['idFuncion', 'sala', 'horario', 'fecha', 'idPelicula'],
                where: {
                    fecha,
                },
            });

            if (result.length == 0) {
                const error = new Error(`No hay Funciones Cargadas para el ${fecha}`);
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: `Funciones del ${fecha}`, result })

        } catch (error) {
            next(error)
        }
    };

    traerFuncionesDeUnHorario = async (req, res, next) => {
        try {
            const { fecha, horario } = req.params;

            const result = await Funcion.findAll({
                attributes: ['idFuncion', 'sala', 'horario', 'fecha', 'idPelicula'],
                where: {
                    fecha,
                    horario,
                },
            });

            if (result.length == 0) {
                const error = new Error(`No hay Funciones Cargadas para el horario ${horario} del ${fecha}`);
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: ` Funciones a las ${horario} del ${fecha}`, result })

        } catch (error) {
            next(error)
        }
    };

    traerFuncionesDeUnaPelicula = async (req, res, next) => {
        try {
            const { idPelicula } = req.params;

            const result = await Funcion.findAll({
                attributes: ['idFuncion', 'sala', 'horario', 'fecha', 'idPelicula'],
                where: {
                    idPelicula
                },
            });

            if (result.length == 0) {
                const error = new Error("No Funciones Programadas para esa Pelicula ");
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: "Funciones para la pelicula con ID " + idPelicula + ":", result })

        } catch (error) {
            next(error)
        }
    };

    crearFuncion = async (req, res, next) => {
        try {

            const { sala, horario, fecha, idPelicula } = req.body;

            if (!validTime(horario)) {
                const error = new Error(`el Formato de la Hora es incorrecto ${horario}`);
                error.status = 400;
                throw error;

            }

            if (!validDate(fecha)) {
                const error = new Error(`el Formato de la Fecha es incorrecto ${fecha}`);
                error.status = 400;
                throw error;

            }


            const yaHayFuncionProgramada = await Funcion.findOne({
                where: {
                    sala,
                    horario,
                    fecha,
                }
            });

            if (yaHayFuncionProgramada != null) {
                const error = new Error(`En el dia ${fecha}, la Sala ${sala} ya cuenta con una Funcion en el horario ${horario}`);
                error.status = 400;
                throw error;
            }

            const result = await Funcion.create({
                sala,
                horario,
                fecha,
                idPelicula,
            });

            if (!result) {
                const error = new Error("Error al crear la Funcion");
                error.status = 400;
                throw error;
            }

            res
                .status(200)
                .send({ success: true, message: "Funcion Creada Exitosamente", result });

        } catch (error) {
            next(error);
        }
    };

    borrarFuncion = async (req, res, next) => {
        try {
            const { sala, horario } = req.body;

            const result = await Funcion.destroy({
                where: {
                    sala,
                    horario,
                }
            });

            if (!result) {
                const error = new Error("Error al borrar la Funcion");
                error.status = 400;
                throw error;
            }

            res
                .status(200)
                .send({ success: true, message: "Funcion Borrada Exitosamente", result });

        } catch (error) {
            next(error);
        }
    };

};

export default FuncionController;