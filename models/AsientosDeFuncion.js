import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";


const AsientosDeFuncion = connection.define("AsientosDeFuncion", {


    idFuncion: {
        type: DT.INTEGER,
        primaryKey: true,
    },

    idAsiento: {
        type: DT.INTEGER,
        primaryKey: true,
    },

    numeroAsiento: {
        type: DT.INTEGER,
        allowNull: false,
    },


    idReserva: {
        type: DT.INTEGER,
        allowNull:true,
    },


}, {
    timestamps: false
});

export default AsientosDeFuncion;