import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";

import Funcion from "./Funcion.js";


const Reserva = connection.define("Reserva", {

    idReserva:{
        type: DT.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    }, 

    idFuncion: {
        type: DT.INTEGER,
        allowNull: false,
        foreignKey: true,
    },

    idUsuario: {
        type: DT.INTEGER,
        allowNull: false,
        foreignKey: true,
    },

    idAsiento: {
        type: DT.INTEGER,
        allowNull: false,
        foreignKey: true,
    },


}, {
    timestamps: false
})

export default Reserva