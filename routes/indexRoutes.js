import { Router } from "express";
import usuarioRoutes from "./usuarioRoutes.js";

const indexRoutes =  Router()

indexRoutes.use("/usuario", usuarioRoutes)


export default indexRoutes