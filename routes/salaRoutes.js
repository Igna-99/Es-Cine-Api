import { Router } from "express";
import SalaController from "../controller/SalaController.js";

const salaController = new SalaController();

const salaRoutes = Router();

salaRoutes.get("/",salaController.traerTodasLasSalas);

salaRoutes.get("/:sala",salaController.traerSala);

<<<<<<< HEAD
salaRoutes.post("/", salaController.crearSala);

salaRoutes.put("/:sala", salaController.actualizarAsientos);
=======
>>>>>>> f6a52bff816b9b4985c5530b5bf8b7c97eeef115

export default salaRoutes;