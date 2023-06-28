import { Rol } from "../models/index.js";

const rolSeed = async () => {
  try {
    await Rol.bulkCreate([
      {
        rol: "admin",
      },
      {
        rol: "user",
      },
    ]);
  } catch (error) {
    console.log(error.message);
  }
};

export default rolSeed;