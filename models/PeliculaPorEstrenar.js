import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";


const PeliculaPorEstrenar = connection.define("PeliculaPorEstrenar", {

    idPelicula: {
        type: DT.INTEGER,
        allowNull: false,
        primaryKey: true,
    },

}, {
    timestamps: false,
    tableName: 'PeliculasPorEstrenar',
})

export default PeliculaPorEstrenar;