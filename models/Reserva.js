import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";

const Reserva = connection.define("Reserva", {

    numeroSala:{
        type: DT.CHAR(1),
        allowNull: false,
        foreignKey: true,
        primaryKey: true,
        validate: {
            isUppercase: true, 
        }
    },

    numeroAsiento:{
        type: DT.INTEGER,
        allowNull: false,
        foreignKey: true,
        primaryKey: true,
    },

    idPelicula:{
        type: DT.INTEGER,
        allowNull: false,
        foreignKey: true,
        primaryKey: true,
    },
    
    horario:{
        type: DT.TIME,
        allowNull: false,
        primaryKey: true,
    },

    idUusario:{
        type: DT.INTEGER,
        allowNull: false,
        foreignKey: true,
    },

}, {
    timestamps: false
})

export default Reserva