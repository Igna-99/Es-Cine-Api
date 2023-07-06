import { Router } from "express";
import PeliculaController from "../controller/PeliculaController.js";

import validateAccess from "../middleware/validateAccess.js";
import isAdmin from "../middleware/isAdmin.js";


const peliculaController = new PeliculaController();

const peliculaRoutes = Router();


peliculaRoutes.get("/",peliculaController.traerTodasLasPeliculas);


//con necesidad de ser admin
peliculaRoutes.use(validateAccess);
peliculaRoutes.use(isAdmin);


peliculaRoutes.post("/",peliculaController.agregarPelicula);

peliculaRoutes.delete("/",peliculaController.eliminarPelicula);


export default peliculaRoutes;