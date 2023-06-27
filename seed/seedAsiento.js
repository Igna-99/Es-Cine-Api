import { Asiento } from "../models/index.js";


const seedAsiento = async () => {
    try {

        await Asiento.bulkCreate([
            {
                numeroAsiento: 1,
                sala: 'A',
            },
            {
                numeroAsiento: 2,
                sala: 'A',
            },
            {
                numeroAsiento: 3,
                sala: 'A',
            },
            {
                numeroAsiento: 1,
                sala: 'B',
            },
            {
                numeroAsiento: 2,
                sala: 'B',
            },
            {
                numeroAsiento: 3,
                sala: 'B',
            },
            {
                numeroAsiento: 1,
                sala: 'C',
            },
            {
                numeroAsiento: 2,
                sala: 'C',
            },
            {
                numeroAsiento: 3,
                sala: 'C',
            },
        ]);

    } catch (error) {
        console.log(error.message);
    }
};

export default seedAsiento;