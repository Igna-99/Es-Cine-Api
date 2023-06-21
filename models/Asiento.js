import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";

const Asiento = connection.define("Asiento",{

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

    numeroAsiento: {
        type: DT.INTEGER,
        allowNull: false,
        primaryKey: true,  
    },

    reservado:{
        type: DT.BOOLEAN,
        allowNull: false,
        defaultValue:false,
    }



}, {
    timestamps: false
});

export default Asiento;