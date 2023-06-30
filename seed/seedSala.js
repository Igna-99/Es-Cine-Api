import { Sala } from "../models/index.js";


const seedSala = async () => {
    try {

        await Sala.bulkCreate([
            {
                sala: 'A',
                capacidad: 5,
            },
            {
                sala: 'B',
                capacidad: 5,
            },
            {
                sala: 'C',
                capacidad: 5,
            },
        ]);

    } catch (error) {
        console.log(error.message);
    }
};

export default seedSala;