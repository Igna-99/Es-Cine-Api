import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";


const AsientosDeFuncion = connection.define("AsientosDeFuncion", {


    idAsiento: {
        type: DT.INTEGER,
        primaryKey: true,
    },

    idFuncion: {
        type: DT.INTEGER,
        primaryKey: true,
    },

    idReserva: {
        type: DT.INTEGER,
        allowNull:true,
    },


}, {
    timestamps: false
});

export default AsientosDeFuncion;