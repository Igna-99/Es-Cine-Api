import { Sala, Asiento } from "../models/index.js";

class SalaController {

    constructor() {}

    traerTodasLasSalas = async (req, res, next) => {
        try {
            const result = await Sala.findAll({
                attributes: ["sala", "capacidad"],
                include: {
                    model: Asiento,
                    attributes: ['numeroAsiento','reservado'],
                }

            });

            if (result.length == 0) {
                const error = new Error("no hay salas cargadas");
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: "salas:", result })

        } catch (error) {
            next(error)
        }
    };

    traerSala = async (req, res, next) => {
        try {
            const { sala } = req.params;

            const result = await Sala.findOne({
                attributes: ["sala", "capacidad"],
                include: {
                    model: Asiento,
                    attributes: ['numeroAsiento','reservado'],
                },
                where: {
                    sala
                },

            });

            if (result.length == 0) {
                const error = new Error("salas cargadas aun");
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: "sala:", result })

        } catch (error) {
            next(error)
        }
    };





};

export default SalaController;