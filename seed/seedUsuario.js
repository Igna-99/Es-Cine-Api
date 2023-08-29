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
        nombre: `Ignacio`,
        apellido: `Varela`,
        email: `ignaciovarela7765@gmail.com`,
        contraseña: `1234`,
      },
      {
        nombre: `Tomas`,
        apellido: `Macri`,
        email: `tommy11@gmail.com`,
        contraseña: `1234`,
        idRol: 1,
        habilitado: false
      },
      {
        nombre: `Martina`,
        apellido: `Diaz`,
        email: `mardi@gmail.com`,
        contraseña: `1234`,
      },
      {
        nombre: `Nahuel`,
        apellido: `Perez`,
        email: `nahu@gmail.com`,
        contraseña: `1234`,
      },
      {
        nombre: `Camila`,
        apellido: `Fernandez`,
        email: `cami@gmail.com`,
        contraseña: `1234`,
      },
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

export default seedUsuario;