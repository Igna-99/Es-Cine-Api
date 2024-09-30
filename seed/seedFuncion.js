import { Funcion } from "../models/index.js";

const seedFuncion = async () => {
  try {
    await Funcion.bulkCreate([
      {
        idPelicula: 569094,
        sala: "A",
        horario: "21:30",
        fecha: "2024-09-19",
      },
      {
        idPelicula: 713704,
        sala: "B",
        horario: "21:30",
        fecha: "2024-09-19",
      },
      {
        idPelicula: 315162,
        sala: "C",
        horario: "21:30",
        fecha: "2024-09-18",
      },
      {
        idPelicula: 447277,
        sala: "A",
        horario: "23:30",
        fecha: "2024-09-18",
      },
      {
        idPelicula: 713704,
        sala: "B",
        horario: "21:30",
        fecha: "2024-09-18",
      },
      {
        idPelicula: 447277,
        sala: "C",
        horario: "21:30",
        fecha: "2024-09-18",
      },
      {
        idPelicula: 569094,
        sala: "A",
        horario: "21:30",
        fecha: "2024-09-18",
      },
      {
        idPelicula: 315162,
        sala: "B",
        horario: "23:30",
        fecha: "2024-09-18",
      },
      //
      {
        idPelicula: 713704,
        sala: "A",
        horario: "21:30",
        fecha: "2024-09-19",
      },
      {
        idPelicula: 76600,
        sala: "B",
        horario: "21:30",
        fecha: "2024-09-19",
      },
      {
        idPelicula: 792307,
        sala: "C",
        horario: "21:30",
        fecha: "2024-09-19",
      },
      {
        idPelicula: 823464,
        sala: "A",
        horario: "23:30",
        fecha: "2024-09-19",
      },
      {
        idPelicula: 693134,
        sala: "B",
        horario: "21:30",
        fecha: "2024-09-19",
      },
      //
      {
        idPelicula: 76600,
        sala: "A",
        horario: "21:30",
        fecha: "2024-09-20",
      },
      {
        idPelicula: 713704,
        sala: "B",
        horario: "21:30",
        fecha: "2024-09-20",
      },
      {
        idPelicula: 315162,
        sala: "C",
        horario: "21:30",
        fecha: "2024-09-20",
      },
      {
        idPelicula: 447277,
        sala: "A",
        horario: "23:30",
        fecha: "2024-09-20",
      },
      {
        idPelicula: 713704,
        sala: "B",
        horario: "21:30",
        fecha: "2024-09-20",
      },
      {
        idPelicula: 447277,
        sala: "C",
        horario: "21:30",
        fecha: "2024-09-20",
      },
      {
        idPelicula: 569094,
        sala: "A",
        horario: "21:30",
        fecha: "2024-09-20",
      },
      {
        idPelicula: 315162,
        sala: "B",
        horario: "23:30",
        fecha: "2024-09-20",
      },
      {
        idPelicula: 447277,
        sala: "C",
        horario: "21:30",
        fecha: "2024-09-20",
      },
      {
        idPelicula: 438631,
        sala: "A",
        horario: "21:30",
        fecha: "2024-09-20",
      },
      {
        idPelicula: 315162,
        sala: "B",
        horario: "23:30",
        fecha: "2024-09-20",
      },
      //
      {
        idPelicula: 569094,
        sala: "A",
        horario: "21:30",
        fecha: "2024-09-21",
      },
      {
        idPelicula: 713704,
        sala: "B",
        horario: "21:30",
        fecha: "2024-09-21",
      },
      {
        idPelicula: 315162,
        sala: "C",
        horario: "21:30",
        fecha: "2024-08-21",
      },
      {
        idPelicula: 447277,
        sala: "A",
        horario: "23:30",
        fecha: "2024-08-21",
      },
      {
        idPelicula: 713704,
        sala: "B",
        horario: "21:30",
        fecha: "2024-08-21",
      },
      {
        idPelicula: 447277,
        sala: "C",
        horario: "21:30",
        fecha: "2024-08-21",
      },
      {
        idPelicula: 569094,
        sala: "A",
        horario: "21:30",
        fecha: "2024-08-21",
      },
      {
        idPelicula: 315162,
        sala: "B",
        horario: "23:30",
        fecha: "2024-08-21",
      },
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

export default seedFuncion;
