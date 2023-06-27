import { Router } from "express";
import FuncionController from "../controller/FuncionController.js";

const funcionController = new FuncionController()

const funcionRoutes = Router();


funcionRoutes.get("/",funcionController.traerTodasLasFunciones)

funcionRoutes.get("/sala/:sala",funcionController.traerFuncionesDeUnaSala)

funcionRoutes.get("/horario/:horario",funcionController.traerFuncionesDeUnHorario)

funcionRoutes.get("/pelicula/:idPelicula",funcionController.traerFuncionesDeUnaPelicula)

funcionRoutes.post("/", funcionController.crearFuncion);

export default funcionRoutes