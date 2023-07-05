import { Usuario } from "../models/index.js";

const seedUsuario = async () => {
  try {
    await Usuario.bulkCreate([
      {
        nombre:`bruce`,
        apellido:`wayne`,
        email:`ImBatman@gmail.com`,
        contraseña:`soyadmin`,
        idRol:1
      },
      {
        nombre:`ignacio`,
        apellido:`varela`,
        email:`ignaciovarela7765@gmail.com`,
        contraseña:`1234`,
      },
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

export default seedUsuario;