import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";

const Asiento = connection.define("Asiento",{


    idAsiento:{
        type: DT.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    }, 

    numeroAsiento: {
        type: DT.INTEGER,
        allowNull: false,
    },

    sala: {
        type: DT.CHAR(1),
        allowNull: false,
    },


}, {
    timestamps: false
});

export default Asiento;