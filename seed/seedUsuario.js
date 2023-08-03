import { Usuario } from "../models/index.js";

const seedUsuario = async () => {
  try {
    await Usuario.bulkCreate([
      {
        nombre: `Bruce`,
        apellido: `Wayne`,
        email: `ImBatman@gmail.com`,
        contraseña: `soyadmin`,
        idRol: 1
      },
      {
        nombre: `Tomas`,
        apellido: `Diaz`,
        email: `tommy11@gmail.com`,
        contraseña: `1234`,
        idRol: 1
      },
      {
        nombre: `Ignacio`,
        apellido: `Varela`,
        email: `ignaciovarela7765@gmail.com`,
        contraseña: `1234`,
      },
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

export default seedUsuario;