import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";

class Usuario extends Model { }

Usuario.init({
    nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,

        validate: {
            isAlpha: true
          },
    },
    apellido: {
        type: DataTypes.STRING(20),
        allowNull: false,

        validate: {
            isAlpha: true
          },

    },
    email: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,

        validate: {
          isEmail: true,
        },
      },
    contraseña: {
        type: DataTypes.STRING(20),
        allowNull: false
    },

}, {
    
    sequelize: connection,
    modelName: "Usuario"

})

export default Usuario