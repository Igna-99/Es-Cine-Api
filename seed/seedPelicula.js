import { Pelicula } from "../models/index.js";


const seedPelicula = async () => {
    try {

        await Pelicula.bulkCreate([
            {
                idPelicula: 569094
                //spider-man
            },
            {
                idPelicula: 713704
                //evil dead rise
            },
            {
                idPelicula: 315162
                //el gato con botas 2
            },
            {
                idPelicula: 447277
                //la sirenita 2023
            },
            {
                idPelicula: 569094
            },
        ]);

    } catch (error) {
        console.log(error.message);
    }
};

export default seedPelicula;