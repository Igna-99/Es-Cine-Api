import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class Usuario extends Model {

  async validarContraseña(contraseña){
    return await bcrypt.compare(contraseña, this.contraseña);
  }

}

Usuario.init({

  idUsuario: {
    type: DT.INTEGER,
    primaryKey:true,
    autoIncrement:true,
  },

  nombre: {
    type: DT.STRING(20),
    allowNull: false,

    validate: {
      isAlpha: true
    },
  },

  apellido: {
    type: DT.STRING(20),
    allowNull: false,

    validate: {
      isAlpha: true
    },

  },

  email: {
    type: DT.STRING(20),
    allowNull: false,
    unique: true,

    validate: {
      isEmail: true,
    },
  },

  contraseña: {
    type: DT.STRING(),
    allowNull: false
  },

  salt: {
    type: DT.STRING(),
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