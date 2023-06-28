import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";

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

export default Sala