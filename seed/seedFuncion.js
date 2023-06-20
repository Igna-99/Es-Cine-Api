import { Funcion } from "../models/index.js";


const seedFuncion = async () => {
    try {

        await Funcion.bulkCreate([
            {
                sala: 'A',
                idPelicula: 6585,
                horario: '21:30'
            },
            {
                sala: 'B',
                idPelicula: 6964,
                horario: '21:30'
            },
            {
                sala: 'C',
                idPelicula: 4200,
                horario: '21:30'
            }
        ]);

    } catch (error) {
        console.log(error.message);
    }
};

export default seedFuncion;