import { DataTypes as DT } from "sequelize";
import connection from "../connection/connection.js";

const Rol = connection.define(
  "Rol",
  {
    rol: {
      type: DT.STRING(),
    },
  },
  {
    timestamps: false,
  }
);

export default Rol;