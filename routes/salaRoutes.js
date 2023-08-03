import { Router } from "express";
import SalaController from "../controller/SalaController.js";

import validateAccess from "../middleware/validateAccess.js";
import isAdmin from "../middleware/isAdmin.js"

const salaController = new SalaController();

const salaRoutes = Router();


salaRoutes.get("/all",salaController.traerTodasLasSalas);

salaRoutes.get("/:sala",salaController.traerSala);


//con necesidad de ser admin

salaRoutes.use(validateAccess);
salaRoutes.use(isAdmin);


salaRoutes.post("/", salaController.crearSala);



export default salaRoutes;