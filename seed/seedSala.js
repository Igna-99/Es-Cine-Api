import { Sala } from "../models/index.js";


const seedSala = async () => {
    try {

        await Sala.bulkCreate([
            {
                sala: 'A',
                capacidad: 3,
            },
            {
                sala: 'B',
                capacidad: 3,
            },
            {
                sala: 'C',
                capacidad: 3,
            },
        ]);

    } catch (error) {
        console.log(error.message);
    }
};

export default seedSala;