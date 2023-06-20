import { Router } from "express";
import usuarioRoutes from "./usuarioRoutes.js";
import funcionRoutes from "./funcionRoutes.js";
import salaRoutes from "./salaRoutes.js";

const indexRoutes =  Router()

indexRoutes.use("/usuario", usuarioRoutes)

indexRoutes.use("/funcion", funcionRoutes)

indexRoutes.use("/sala", salaRoutes)


export default indexRoutes