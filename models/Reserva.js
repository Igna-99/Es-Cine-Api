import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";

import Funcion from "./Funcion.js";


const Reserva = connection.define("Reserva", {

    sala: {
        type: DT.CHAR(1),
        allowNull: false,
        primaryKey: true,
        validate: {
            isAlpha: true,
            isUppercase: true,
            len:[1,1]
        },
    },

    numeroAsiento: {
        type: DT.INTEGER,
        allowNull: false,
        primaryKey: true,  
    },

    horario: {
        type: DT.TIME,
        allowNull: false,
        primaryKey: true,
    },

    idPelicula: {
        type: DT.INTEGER,
        allowNull: false,
    },

    idUusario: {
        type: DT.INTEGER,
        allowNull: false,
        foreignKey: true,
    },

}, {
    timestamps: false
})

export default Reserva