import { Router } from "express";
import PeliculaPorEstrenarController from "../controller/PeliculaPorEstrenarController.js"

import validateAccess from "../middleware/validateAccess.js";
import isAdmin from "../middleware/isAdmin.js";


const peliculaPorEstrenarController = new PeliculaPorEstrenarController();

const peliculaRoutes = Router();


peliculaRoutes.get("/all",peliculaPorEstrenarController.getAllMovies);


//con necesidad de ser admin
peliculaRoutes.use(validateAccess);
peliculaRoutes.use(isAdmin);


peliculaRoutes.post("/create",peliculaPorEstrenarController.addMovie);

peliculaRoutes.post("/release",peliculaPorEstrenarController.releaseMovie);

peliculaRoutes.post("/delete",peliculaPorEstrenarController.deleteMovie);


export default peliculaRoutes;