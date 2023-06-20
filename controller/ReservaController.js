import { Reserva } from "../Models/index.js";

class ReservaController {
    constructor() { }

    trearReservaDeUsuario = async (req, res, next) => {
        try {
            const { idUusario } = req.params;

            const result = await Reserva.findAll({
                attributes: ["numeroSala", "numeroAsiento", "idPelicula", "horario", "idUusario"],
                where: {
                    idUusario
                },
            });

            if (result.length == 0) {
                const error = new Error(`El Usuario ${idUusario} no tiene Reservas`);
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: `Reservas del Usuario ${idUusario}:`, result })

        } catch (error) {

            next(error);
        }

    };

    crearReserva = async (req, res, next) => {
        try {
            const { idUusario } = req.params;
            const { numeroSala, numeroAsiento, idPelicula, horario } = req.body
            const result = await Reserva.create({ numeroSala, numeroAsiento, idPelicula, horario, idUusario })

            if (!result) {
                const error = new Error("ERROR AL CREAR LA RESERVA")
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

    eliminarReserva = async (req, res, next) => {
        try {
            const { idUusario } = req.params;
            const { numeroSala, numeroAsiento, idPelicula, horario } = req.body
            const result = await Reserva.destroy({
                where: { numeroSala, numeroAsiento, idPelicula, horario, idUusario }
            })
 
            if (!result) {
                const error = new Error("Error al borrar reserva de usuario")
                error.status = 400;
                throw error;
            }

            res
                .status(200)
                .send({ success: true, message: "Reserva borrada", result})
                
        } catch (error) {

            next(error)
        }
    };


}


export default ReservaController