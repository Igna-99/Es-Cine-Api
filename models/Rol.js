import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";

const Rol = connection.define("Rol",
  {
    idRol: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    rol: {
      type: DT.STRING(),
      allowNull: false,
      unique: true
    },
  },
  {
    timestamps: false,
  }
);

export default Rol;