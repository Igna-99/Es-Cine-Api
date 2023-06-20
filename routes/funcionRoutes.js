import { Router } from "express";
import FuncionesController from "../controller/FuncionesController.js";

const funcionesController = new FuncionesController()

const funcionRoutes = Router();


funcionRoutes.get("/",funcionesController.traerTodasLasFunciones)

funcionRoutes.get("/sala/:sala",funcionesController.traerFuncionesDeUnaSala)

funcionRoutes.get("/horario/:horario",funcionesController.traerFuncionesDeUnHorario)

funcionRoutes.get("/pelicula/:idPelicula",funcionesController.traerFuncionesDeUnaPelicula)


export default funcionRoutes