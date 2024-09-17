import { Pelicula } from "../models/index.js";

const seedPelicula = async () => {
  try {
    await Pelicula.bulkCreate([
      {
        idPelicula: 569094,
        //spider-man
      },
      {
        idPelicula: 713704,
        //evil dead rise
      },
      {
        idPelicula: 315162,
        //el gato con botas 2
      },
      {
        idPelicula: 447277,
        //la sirenita 2023
      },
      {
        idPelicula: 872585,
        //Oppenheimer
      },
      {
        idPelicula: 438631,
        //dune
      },
      {
        idPelicula: 693134,
        //dune2
      },
      {
        idPelicula: 1239251,
        //megamente 2
      },
      {
        idPelicula: 823464,
        //godzilla and kong
      },
      {
        idPelicula: 359410,
        //road house
      },
      {
        idPelicula: 792307,
        //Poor Things
      },
      {
        idPelicula: 76600,
        //Avatar 2
      },
      {
        idPelicula: 4512,
        //El asesinato de Jesse James por el cobarde Robert Ford (2007)
      },
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

export default seedPelicula;
