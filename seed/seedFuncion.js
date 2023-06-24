import { Funcion } from "../models/index.js";


const seedFuncion = async () => {
    try {

        await Funcion.bulkCreate([
            {
                idPelicula: 6585,
                sala: 'A',
                horario: '21:30'
            },
            {
                idPelicula: 6964,
                sala: 'B',
                horario: '21:30'
            },
            {
                idPelicula: 4200,
                sala: 'C',
                horario: '21:30'
            }
        ]);

    } catch (error) {
        console.log(error.message);
    }
};

export default seedFuncion;