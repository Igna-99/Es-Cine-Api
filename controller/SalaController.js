import { Sala, Asiento } from "../models/index.js";

class SalaController {

  constructor() { }

  traerTodasLasSalas = async (req, res, next) => {
    try {
      const result = await Sala.findAll({
        attributes: ["sala", "capacidad"],
        include: {
          model: Asiento,
          attributes: ['numeroAsiento', 'idAsiento'],
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
          attributes: ['numeroAsiento', 'idAsiento'],
        },
        where: {
          sala
        },

      });

      if (result.length == 0) {
        const error = new Error("no hay salas cargadas");
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

  crearSala = async (req, res, next) => {
    try {
      const { sala, capacidad } = req.body;
      console.log(req.body);
      if (capacidad.length >= 3 || capacidad.length < 1) {
        const error = new Error("La capacidad tiene que ser menor a 30 y mayor a 0")
        error.status = 400;
        throw error;
      }
      const result = await Sala.create({ sala, capacidad })
      res
      .status(200)
      .send({ success: true, message: "Sala Creada Exitosamente", result })
    } catch (error) {
      next(error);
      console.log(error);
      console.log('No se puede crear la sala')
    }
  }

};

export default SalaController;