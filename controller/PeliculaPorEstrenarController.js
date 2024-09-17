import connection from "../connection/connection.js";
import { PeliculaPorEstrenar, Pelicula } from "../models/index.js";

class PeliculaPorEstrenarController {
  constructor() {}

  getAllMovies = async (req, res, next) => {
    try {
      const allMovies = await PeliculaPorEstrenar.findAll({
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

      const movieAlreadyOnUpcoming = await PeliculaPorEstrenar.findByPk(
        idPelicula
      );
      if (movieAlreadyOnUpcoming) {
        const error = new Error("La pelicula ya se encuentra en 'por estrenar'");
        error.status = 400;
        throw error;
      }

      const movieAlreadyOnTheaters = await Pelicula.findByPk(idPelicula);
      if (movieAlreadyOnTheaters) {
        const error = new Error("La pelicula ya se encuentra en cartelera");
        error.status = 400;
        throw error;
      }

      const newMovie = await PeliculaPorEstrenar.create({
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

      const deletedMovie = await PeliculaPorEstrenar.destroy({
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

  releaseMovie = async (req, res, next) => {
    const { idPelicula } = req.body;
    const transaction = await connection.transaction();

    try {
      if (!idPelicula) {
        const error = new Error("Datos faltantes o no válidos");
        error.status = 400;
        throw error;
      }

      //Comprobamos que la pelicula no este en cartelera

      const movieAlreadyOnTheaters = await Pelicula.findByPk(idPelicula, {
        transaction,
      });
      if (movieAlreadyOnTheaters) {
        const error = new Error(`La pelicula ya se encuentra en cartelera`);
        error.status = 400;
        throw error;
      }

      //Comprobamos que la pelicula este en por estrenar

      const movieToRelease = await PeliculaPorEstrenar.findByPk(idPelicula, {
        transaction,
      });
      if (!movieToRelease) {
        const error = new Error(
          `No se han encontrado pelicualas con ID ${idPelicula}`
        );
        error.status = 400;
        throw error;
      }

      //Eliminamos la pelicula de la lista de por estrenar

      const movieDeleted = await PeliculaPorEstrenar.destroy({
        where: {
          idPelicula,
        },
        transaction,
      });
      if (!movieDeleted) {
        const error = new Error(`Error al eliminar la pelicula`);
        error.status = 500;
        throw error;
      }

      //Agregamos la pelicula a la cartelera

      const movieReleased = await Pelicula.create({
        idPelicula,
        transaction,
      });
      if (!movieReleased) {
        const error = new Error(`Error al crear la pelicula`);
        error.status = 500;
        throw error;
      }

      await transaction.commit();

      res.status(200).send({
        success: true,
        message: `La Pelicula con ID ${idPelicula} se a estrenado correctamente`,
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  };
}

export default PeliculaPorEstrenarController;
