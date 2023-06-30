import { Reserva, Asiento, Funcion, AsientosDeFuncion } from "../models/index.js";

class ReservaController {

    constructor() { }

    trearReservaDeUsuario = async (req, res, next) => {
        try {
            const { idUsuario } = req.params;

            const result = await Reserva.findAll({
                attributes: ["idReserva", "idUsuario"],
                include: [
                    {
                        model: Asiento,
                        attributes: ['numeroAsiento'],
                    },
                    {
                        model: Funcion,
                        attributes: ['Horario', 'sala', 'idPelicula'],
                    },
                ],
                where: {
                    idUsuario
                },
            });

            if (result.length == 0) {
                const error = new Error(`El Usuario ${idUsuario} no tiene Reservas`);
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: `Reservas del Usuario ${idUsuario}:`, result })

        } catch (error) {

            next(error);
        }

    };

    crearReserva = async (req, res, next) => {
        try {

            const { idUsuario } = req.params;

            const { IdFuncion, idAsiento } = req.body

            // compruba que el asiento este disponible

            const asientoDeFuncion = await Asiento.findOne({
                where: {
                    IdFuncion,
                    idAsiento
                }
            })

            if (!asientoDeFuncion) {
                const error = new Error("Error, El Asiento de Funcion inexistente")
                error.status = 401;
                throw error;
            }
            if (asientoDeFuncion.idReserva != null) {
                const error = new Error("Error, El asiento Seleccionado ya esta Reservado")
                error.status = 401;
                throw error;
            }

            



            res
                .status(200)
                .send({ success: true, message: "Reserva Creada Exitosamente", result })

        } catch (error) {

            next(error)
        }
    };


}


export default ReservaController