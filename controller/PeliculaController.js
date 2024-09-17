import { Pelicula, PeliculaPorEstrenar } from "../models/index.js";

class PeliculaController {
  constructor() {}

  getAllMovies = async (req, res, next) => {
    try {
      const allMovies = await Pelicula.findAll({
        attributes: ["idPelicula"],
      });

      if (allMovies.length == 0) {
        const error = new Error("No hay peliculas cargadas");
        error.status = 404;
        throw error;
      }

      res.status(200).send({
        success: true,
        message: "id de peliculas:",
        result: allMovies,
      });
    } catch (error) {
      next(error);
    }
  };

  addMovie = async (req, res, next) => {
    const { idPelicula } = req.body;
    try {
      if (!idPelicula) {
        const error = new Error("Datos faltantes o no válidos");
        error.status = 400;
        throw error;
      }

      const movieAlreadyOnTheaters = await Pelicula.findByPk(idPelicula);
      if (movieAlreadyOnTheaters) {
        const error = new Error("La pelicula ya se encuentra en cartelera");
        error.status = 400;
        throw error;
      }

      const movieAlreadyOnUpcoming = await PeliculaPorEstrenar.findByPk(
        idPelicula
      );
      if (movieAlreadyOnUpcoming) {
        const error = new Error("La pelicula ya se encuentra en 'por estrenar'");
        error.status = 400;
        throw error;
      }

      const newMovie = await Pelicula.create({
        idPelicula,
      });
      if (!newMovie) {
        const error = new Error("No se pudo crear esta pelicula");
        error.status = 500;
        throw error;
      }

      res.status(200).send({
        success: true,
        message: "Pelicula Creada",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteMovie = async (req, res, next) => {
    const { idPelicula } = req.body;
    try {
      if (!idPelicula) {
        const error = new Error("Datos faltantes o no válidos");
        error.status = 400;
        throw error;
      }

      const deletedMovie = await Pelicula.destroy({
        where: {
          idPelicula,
        },
      });
      if (!deletedMovie) {
        const error = new Error(
          `No se han encontrado pelicualas con ID ${idPelicula}`
        );
        error.status = 404;
        throw error;
      }

      res.status(200).send({
        success: true,
        message: "Pelicula Eliminada",
      });
    } catch (error) {
      if (!error.status) {
        error.status = 500; // 500: Error interno del servidor
        error.message = "Error interno del servidor";
      }
      next(error);
    }
  };
}

export default PeliculaController;
