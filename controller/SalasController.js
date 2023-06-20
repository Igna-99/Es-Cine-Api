import { Sala } from "../models/index.js";

class SalaController {

    constructor() {}

    traerTodasLasSalas = async (req, res, next) => {
        try {
            const result = await Sala.findAll({
                attributes: ["sala", "capacidad"]
            });

            if (result.length == 0) {
                const error = new Error("salas cargadas aun");
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



};

export default SalaController;