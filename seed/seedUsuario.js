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
        nombre: `luciano`,
        apellido: `Aguilar`,
        email: `aguilu@gmail.com`,
        contraseña: `1234`,
      },
      {
        nombre: `nomb1`,
        apellido: `apell1`,
        email: `email1@gmail.com`,
        contraseña: `1234`,
      },
      {
        nombre: `nomb2`,
        apellido: `apell1`,
        email: `email2@gmail.com`,
        contraseña: `1234`,
        idRol: 1,
        habilitado: false
      },
      {
        nombre: `nomb3`,
        apellido: `apell3`,
        email: `email3@gmail.com`,
        contraseña: `1234`,
      },
      {
        nombre: `nomb4`,
        apellido: `apell4`,
        email: `email4@gmail.com`,
        contraseña: `1234`,
      },
      
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

export default seedUsuario;