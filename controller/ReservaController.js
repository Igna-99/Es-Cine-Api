import { Reserva, Asiento, Funcion } from "../models/index.js";

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

            
            // no se si esto esta bien, preguntar

            const auxAsiento = await Asiento.findOne({
                where:{
                    idAsiento
                }
            })
            const auxFuncion = await Funcion.findOne({
                where:{
                    IdFuncion
                }
            })

            if( auxAsiento.sala != auxFuncion.sala ) {
                const error = new Error("Error, El asiento Seleccionado no es de la misma sala que la funcion")
                error.status = 401;
                throw error;
            }


            //


            const result = await Reserva.create({
                idFuncion: parseInt(IdFuncion),
                idAsiento: parseInt(idAsiento),
                idUsuario: parseInt(idUsuario),

            })

            if (!result) {
                const error = new Error("Error al crear Reserva")
                error.status = 400;
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