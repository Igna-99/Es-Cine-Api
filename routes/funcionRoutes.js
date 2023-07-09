import { Router } from "express";
import FuncionController from "../controller/FuncionController.js";

import validateAccess from "../middleware/validateAccess.js";
import isAdmin from "../middleware/isAdmin.js";

const funcionController = new FuncionController();

const funcionRoutes = Router();


funcionRoutes.get("/all",funcionController.traerTodasLasFunciones);

funcionRoutes.get("/:idFuncion",funcionController.traerFuncionPorId);

funcionRoutes.get("/sala/:sala",funcionController.traerFuncionesDeUnaSala);

funcionRoutes.get("/horario/:horario",funcionController.traerFuncionesDeUnHorario);

funcionRoutes.get("/fecha/:fecha",funcionController.traerFuncionesDeUnaFecha);

funcionRoutes.get("/pelicula/:idPelicula",funcionController.traerFuncionesDeUnaPelicula);


//con necesidad de ser admin
funcionRoutes.use(validateAccess);
funcionRoutes.use(isAdmin);


funcionRoutes.post("/", funcionController.crearFuncion);

funcionRoutes.delete("/", funcionController.borrarFuncion);

export default funcionRoutes