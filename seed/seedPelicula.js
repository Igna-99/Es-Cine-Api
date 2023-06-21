import { Pelicula } from "../models/index.js";


const seedPelicula = async () => {
    try {

        await Pelicula.bulkCreate([
            {
                idPelicula: 6585
            },
            {
                idPelicula: 6964
            },
            {
                idPelicula: 4200
            },
        ]);

    } catch (error) {
        console.log(error.message);
    }
};

export default seedPelicula;