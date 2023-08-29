import { Funcion } from "../models/index.js";


const seedFuncion = async () => {
    try {

        await Funcion.bulkCreate([
            {
                idPelicula: 569094,
                sala: 'A',
                horario: '21:30',
                fecha: '2023-10-18'
            },
            {
                idPelicula: 713704,
                sala: 'B',
                horario: '21:30',
                fecha: '2023-10-18'
            },
            {
                idPelicula: 315162,
                sala: 'C',
                horario: '21:30',
                fecha: '2023-10-18'
            },
            {
                idPelicula: 447277,
                sala: 'A',
                horario: '23:30',
                fecha: '2023-10-18'
            },

            {
                idPelicula: 713704,
                sala: 'B',
                horario: '21:30',
                fecha: '2023-10-19'
            },
            {
                idPelicula: 447277,
                sala: 'C',
                horario: '21:30',
                fecha: '2023-10-19'
            },
            {
                idPelicula: 569094,
                sala: 'A',
                horario: '21:30',
                fecha: '2023-10-19'
            },
            {
                idPelicula: 315162,
                sala: 'B',
                horario: '23:30',
                fecha: '2023-10-19'
            },

        ]);

    } catch (error) {
        console.log(error.message);
    }
};

export default seedFuncion;