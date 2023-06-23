import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class Usuario extends Model {

  async validarContraseña(contraseña){
    return await bcrypt.compare(contraseña, this.contraseña);
  }


}

Usuario.init({

  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
  },

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
    type: DataTypes.STRING(),
    allowNull: false
  },

  salt: {
    type: DataTypes.STRING(),
  },

}, {

  sequelize: connection,
  modelName: "Usuario"

})

Usuario.beforeCreate(async (user) => {

  const salt = await bcrypt.genSalt();
  user.salt = salt;

  const contraseñaHash = await bcrypt.hash(user.contraseña, salt);
  user.contraseña = contraseñaHash;

});

export default Usuario