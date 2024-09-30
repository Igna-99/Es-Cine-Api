import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

import { Asiento, AsientosDeFuncion } from './index.js'

class Funcion extends Model { }

Funcion.init({

    idFuncion: {
        type: DT.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    idPelicula: {
        type: DT.INTEGER,
        allowNull: false,
    },

    sala: {
        type: DT.CHAR(1),
        allowNull: false,
        validate: {
            isAlpha: true,
            isUppercase: true,
            len: [1, 1]
        },
    },

    horario: {
        type: DT.TIME,
        allowNull: false,
    },

    fecha: {
        type: DT.DATEONLY,
        allowNull: false,
    },

}, {

    sequelize: connection,
    modelName: "Funcion",
    timestamps: false

});

// Este 'Trigger?' genera todos los AsientosDeFuncion de una Funcion, trayendo todos los Asientos de la Sala seleccionada,
// y generando asi la tabla Intermedia Automáticamente

// cabe resaltar que es necesario que la sala en cuestión tenga sus Asientos cargados,
//, pero como sala también tiene un 'Trigger?' similar, todas las salas deberían tener sus asientos
Funcion.afterCreate(async (funcion, options) => {

    try {
        let asientosDeSalaSeleccionada = await Asiento.findAll({
            where: { sala: funcion.sala },
            transaction: options.transaction
        });

        for (let asiento of asientosDeSalaSeleccionada) {
            await AsientosDeFuncion.create({
                idFuncion: funcion.idFuncion,
                idAsiento: asiento.idAsiento,
                numeroAsiento: asiento.numeroAsiento,
            }, { transaction: options.transaction });
        }
    } catch (error) {
        console.error('Error on afterCreate:', error);
        throw error;  // Relanza el error para que se maneje adecuadamente
    }
});

// lo mismo que el anterio, pero para BulkCreate

Funcion.afterBulkCreate(async (funciones) => {


    for (let index = 0; index < funciones.length; index++) {
        const funcion = funciones[index];

        let aisientosDeSalaSeleccionada = await Asiento.findAll({
            where: {
                sala: funcion.sala
            }
        });

        for (let index = 0; index < aisientosDeSalaSeleccionada.length; index++) {
            const asiento = aisientosDeSalaSeleccionada[index];

            await AsientosDeFuncion.create({
                idFuncion: funcion.idFuncion,
                idAsiento: asiento.idAsiento,
                numeroAsiento: asiento.numeroAsiento,
            })

        }

    }

});



export default Funcion;

