import { Sala } from "../models/index.js";


const seedSala = async () => {
    try {

        await Sala.bulkCreate([
            {
                sala: 'A',
                capacidad: 30,
            },
            {
                sala: 'B',
                capacidad: 20,
            },
            {
                sala: 'C',
                capacidad: 20,
            },
        ]);

    } catch (error) {
        console.log(error.message);
    }
};

export default seedSala;