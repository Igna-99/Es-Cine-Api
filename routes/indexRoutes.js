import { Router } from "express";

import usuarioRoutes from "./usuarioRoutes.js";
import funcionRoutes from "./funcionRoutes.js";
import salaRoutes from "./salaRoutes.js";
import peliculaRoutes from "./peliculaRoutes.js";
import reservaRoutes from "./reservaRoutes.js";


const indexRoutes =  Router()

indexRoutes.use("/usuario", usuarioRoutes)

indexRoutes.use("/reserva", reservaRoutes)

indexRoutes.use("/funcion", funcionRoutes)

indexRoutes.use("/sala", salaRoutes)

indexRoutes.use("/pelicula", peliculaRoutes)


export default indexRoutes