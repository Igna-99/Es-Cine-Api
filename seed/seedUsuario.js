import { Usuario } from "../models/index.js";

const seedUsuario = async () => {
  try {
    await Usuario.bulkCreate([
      {
        nombre: `Bruce`,
        apellido: `Wayne`,
        email: `ImBatman@gmail.com`,
        contraseña: `soyadmin`,
        idRol: 1,
      },
      {
        nombre: `Juan Ignacio`,
        apellido: `Varela`,
        email: `ignaciovarela7765@gmail.com`,
        contraseña: `1234`,
      },
      {
        nombre: `Tomas Sebastian`,
        apellido: `Macri Aguirre`,
        email: `tommy11@gmail.com`,
        contraseña: `1234`,
        idRol: 1,
        habilitado: false,
      },
      {
        nombre: `Martina`,
        apellido: `Diaz`,
        email: `mardi@gmail.com`,
        contraseña: `1234`,
      },
      {
        nombre: `Francisco`,
        apellido: `Rodriguez`,
        email: `Francho@gmail.com`,
        contraseña: `1234`,
      },
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

export default seedUsuario;
