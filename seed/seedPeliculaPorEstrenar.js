import { PeliculaPorEstrenar } from "../models/index.js";

const seedPeliculaPorEstrenar = async () => {
  try {
    await PeliculaPorEstrenar.bulkCreate([
      {
        idPelicula: 977262,
        //ezra
      },
      {
        idPelicula: 957452,
        //the crow
      },
      {
        idPelicula: 646683,
        //The Exorcism
      },
      {
        idPelicula: 533535,
        //Deadpool 3
      },
      {
        idPelicula: 917496,
        //beetlejuice 2
      },
      {
        idPelicula: 945961,
        //alien romulus
      },
      {
        idPelicula: 1160018,
        //kill
      },
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

export default seedPeliculaPorEstrenar;
