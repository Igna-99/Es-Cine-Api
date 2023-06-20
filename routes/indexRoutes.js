import { Router } from "express";
import usuarioRoutes from "./usuarioRoutes.js";
import funcionRoutes from "./funcionRoutes.js";

const indexRoutes =  Router()

indexRoutes.use("/usuario", usuarioRoutes)

indexRoutes.use("/funcion", funcionRoutes)


export default indexRoutes