import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";

import { Asiento } from "../models/index.js";

const Sala = connection.define("Sala", {

    sala: {
        type: DT.CHAR(1),
        allowNull: false,
        primaryKey: true,
        validate: {
            isAlpha: true,
            isUppercase: true,
            len: [1, 1]
        },
    },

    capacidad: {
        type: DT.INTEGER,
        allowNull: false,
        validate: {
            max: 30,
            min: 1,
        },
    }

}, {
    timestamps: false
})


// Este 'Trigger?' genera todas los Asientos de una Sala, a partir de la capacidad letra de sala de la misma,
// haciendo que no sea necesario cargar manualmente las salas 

Sala.afterCreate(async (sala) => {
    let CantidadAsietnos = sala.capacidad;

    for (let numeroAsiento = 1; numeroAsiento <= CantidadAsietnos; numeroAsiento++) {
        await Asiento.create({
            sala: sala.sala,
            numeroAsiento,
        });
    };

});

// Lo mismo de anterio, pero para BulKCreate

Sala.afterBulkCreate(async (salas) => {

    for (let index = 0; index < salas.length; index++) {

        const sala = salas[index];

        const CantidadAsietnos = sala.capacidad;

        for (let numeroAsiento = 1; numeroAsiento <= CantidadAsietnos; numeroAsiento++) {
            await Asiento.create({
                sala: sala.sala,
                numeroAsiento,
            });

        }
    };

});


export default Sala