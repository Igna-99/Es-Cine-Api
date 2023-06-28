import { DataTypes as DT, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt";

class Usuario extends Model {

  async validarContraseña(contraseña) {
    return await bcrypt.compare(contraseña, this.contraseña);
  }

}

Usuario.init({

  idUsuario: {
    type: DT.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nombre: {
    type: DT.STRING(20),
    allowNull: false,

    validate: {
      isAlpha: {
        msg: "El Nombre debe ser AlphaNumerico"
      }
    },
  },

  apellido: {
    type: DT.STRING(20),
    allowNull: false,

    validate: {
      isAlpha: {
        msg: "El Apellido debe ser AlphaNumerico"
      }
    },

  },

  email: {
    type: DT.STRING(40),
    allowNull: false,
    unique: {
      msg: "El Email ingresado ya esta Registrado"
    },

    validate: {
      isEmail: {
        msg: "El Email ingresado no tiene un formato correcto"
      },
    },
  },

  contraseña: {
    type: DT.STRING(),
    allowNull: false
  },

  idRol: {
    type: DT.INTEGER(),
    defaultValue: 2,
  },

  salt: {
    type: DT.STRING(),
  },

}, {

  sequelize: connection,
  modelName: "Usuario"

})

Usuario.beforeUpdate(async (user) => {

  const nuevaContraseñaHash = await bcrypt.hash(user.contraseña, user.salt);
  user.contraseña = nuevaContraseñaHash;
});

Usuario.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt();
  user.salt = salt;

  const contraseñaHash = await bcrypt.hash(user.contraseña, salt);
  user.contraseña = contraseñaHash;

});



export default Usuario