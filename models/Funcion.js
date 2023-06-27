import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";

class Funcion extends Model { }

Funcion.init({

    idFuncion:{
        type: DT.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    }, 
    
    idPelicula:{
        type: DT.INTEGER,
        allowNull: false,
    },

    sala:{
        type: DT.CHAR(1),
        allowNull: false,
        validate: {
            isAlpha: true,
            isUppercase: true,
            len: [1, 1]
        },
    },    

    horario:{
        type: DT.TIME,
        allowNull: false,
    },

}, {

    sequelize: connection,
    modelName: "Funcion",
    timestamps: false

})



export default Funcion;

