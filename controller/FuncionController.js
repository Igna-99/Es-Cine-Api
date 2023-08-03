import { Funcion, Asiento } from "../models/index.js";
import { separateByDate } from "../utils/separateByDate.js";
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

            let funcionesPorFecha = separateByDate(result)

            res
                .status(200)
                .send({ success: true, message: "Funciones:", funcionesPorFecha })

        } catch (error) {
            next(error)
        }
    };

    traerFuncionPorId = async (req, res, next) => {
        try {

            const { idFuncion } = req.params;

            const result = await Funcion.findOne({
                attributes: ['idFuncion', 'sala', 'horario', 'fecha', 'idPelicula'],
                include: [
                    {
                        model: Asiento,
                        attributes:[ 'idAsiento' ],
                    },
                ],
                where:{
                    idFuncion
                }
            });

            if (!result) {
                const error = new Error(`La Funcion ${idFuncion} no existe.`);
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: `Funcion ${idFuncion}`, result })

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

            let funcionesPorFecha = separateByDate(result)

            res
                .status(200)
                .send({ success: true, message: `Funciones de la Sala ${sala}:`, funcionesPorFecha })

        } catch (error) {
            next(error)
        }
    };

    traerFuncionesDeUnaFecha = async (req, res, next) => {
        try {
            const { fecha } = req.params;

            if (!validDate(fecha)) {
                const error = new Error(`el Formato de la Fecha es incorrecto ${fecha}`);
                error.status = 400;
                throw error;

            }

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
            const { fecha } = req.params;

            const result = await Funcion.findAll({
                attributes: ['idFuncion', 'sala', 'horario', 'fecha', 'idPelicula'],
                where: {
                    horario,
                },
            });

            if (result.length == 0) {
                const error = new Error(`No hay Funciones Cargadas para el horario ${horario} del ${fecha}`);
                error.status = 400
                throw error
            }

            let funcionesPorFecha = separateByDate(result)


            res
                .status(200)
                .send({ success: true, message: ` Funciones a las ${horario} del ${fecha}`, funcionesPorFecha })

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

            let funcionesPorFecha = separateByDate(result)


            res
                .status(200)
                .send({ success: true, message: "Funciones para la pelicula con ID " + idPelicula + ":", funcionesPorFecha })

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
                const error = new Error(`En el dia ${fecha}, la Sala ${sala} ya cuenta con una Funcion en el horario ${horario} Hs`);
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