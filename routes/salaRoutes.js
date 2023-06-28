import { Router } from "express";
import SalaController from "../controller/SalaController.js";

const salaController = new SalaController();

const salaRoutes = Router();

salaRoutes.get("/",salaController.traerTodasLasSalas);

salaRoutes.get("/:sala",salaController.traerSala);

salaRoutes.post("/", salaController.crearSala);

salaRoutes.put("/:sala", salaController.actualizarAsientos);

export default salaRoutes;