import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";


const Pelicula = connection.define("Pelicula", {

    idPelicula: {
        type: DT.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

}, {
    timestamps: false
})

export default Pelicula;