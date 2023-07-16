import { Reserva, Asiento, Funcion, AsientosDeFuncion } from "../models/index.js";

class ReservaController {

    constructor() { }

    trearReservaDeUsuario = async (req, res, next) => {
        try {

            const { idUsuario } = req.user
            const { idReserva } = req.params

            const result = await Reserva.findOne({
                attributes: ["idReserva", "idUsuario"],
                include: [
                    {
                        model: Funcion,
                        attributes: ['sala', 'fecha', 'horario', 'idPelicula'],
                    },
                    {
                        model: AsientosDeFuncion,
                        attributes: ['numeroAsiento',],
                    },
                ],
                where: {
                    idReserva,
                    idUsuario,

                },
            });

            if (!result) {
                const error = new Error(`La Reserva ${idReserva} no pertenece al Usuario ${idUsuario}`);
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: `Reserva del Usuario ${idUsuario}:`, result })

        } catch (error) {

            next(error);
        }

    };

    trearTodasLasReservasDeUsuario = async (req, res, next) => {
        try {
            const { idUsuario } = req.user

            const result = await Reserva.findAll({
                attributes: ["idReserva", "idUsuario"],
                include: [
                    {
                        model: Funcion,
                        attributes: ['sala', 'fecha', 'horario', 'idPelicula'],
                    },
                    {
                        model: AsientosDeFuncion,
                        attributes: ['numeroAsiento',],
                    },
                ],
                where: {
                    idUsuario,
                },
            });

            if (!result) {
                const error = new Error(`Error al buscar las reservas`);
                error.status = 400
                throw error
            }

            if (result.length == 0) {

                res
                    .status(200)
                    .send({ success: true, message: `El Usuario ${idUsuario} no tiene reservas:`, result })

            } else {

                res
                    .status(200)
                    .send({ success: true, message: `Reservas del Usuario ${idUsuario}:`, result })

            }
        } catch (error) {

            next(error);
        }

    };

    crearReserva = async (req, res, next) => {
        try {
            const { idUsuario } = req.user

            const { IdFuncion, numeroAsiento } = req.body

            // buscamos la Funcion seleccionada y lanzamos un error si la misma no existe

            const funcionSeleccionada = await Funcion.findOne({
                where: {
                    IdFuncion: parseInt(IdFuncion),
                }
            });
            if (!funcionSeleccionada) {
                const error = new Error(`Error, La Funcion Seleccionada no Existe`);
                error.status = 400
                throw error
            };

            // buscamos el Asiento seleccionado y lanzamos un error si el mismo no existe

            const asientoSeleccionado = await Asiento.findOne({
                where: {
                    numeroAsiento,
                    sala: funcionSeleccionada.sala,
                }
            });
            if (!asientoSeleccionado) {
                const error = new Error(`Error, El Asiento Selecionado no Existe`);
                error.status = 400
                throw error
            };

            // buscamos el Asiento De Funcion y revisamos si ya esta reservado

            const asientoDeFuncionSeleccionado = await AsientosDeFuncion.findOne({
                where: {
                    IdFuncion: parseInt(IdFuncion),
                    idAsiento: asientoSeleccionado.idAsiento,
                }
            });
            if (asientoDeFuncionSeleccionado.idReserva != null) {
                const error = new Error(`Error, El Asiento se Encuentra Reservado`);
                error.status = 400
                throw error
            };

            //creamos la reserva

            const result = await Reserva.create({
                idUsuario: parseInt(idUsuario),
                idFuncion: parseInt(IdFuncion),

            })
            if (!result) {
                const error = new Error(`Error, no se puedo crear la Reserva`);
                error.status = 400
                throw error
            };

            //asignamos el id de la reserva al Asiento de Funcion y lo guardamos en la DB

            asientoDeFuncionSeleccionado.idReserva = result.idReserva
            asientoDeFuncionSeleccionado.save()


            res
                .status(200)
                .send({ success: true, message: "Reserva Creada Exitosamente", result, asientoDeFuncionSeleccionado })


        } catch (error) {

            next(error)
        }
    };

}


export default ReservaController