import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Funcion extends Model { }

Funcion.init({
    sala:{
        type: DT.CHAR(1),
        allowNull: false,
        primaryKey: true,
        validate: {
            isAlpha: true,
            isUppercase: true,
            len:[1,1]
        }
    },    
    horario:{
        type: DT.TIME,
        allowNull: false,
        primaryKey: true,
    },
    
    idPelicula:{
        type: DT.INTEGER,
        allowNull: false,
    },

}, {

    sequelize: connection,
    modelName: "Funcion",
    timestamps: false

})



export default Funcion;

