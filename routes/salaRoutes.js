import { Router } from "express";
import SalaController from "../controller/SalaController.js";

const salaController = new SalaController();

const salaRoutes = Router();

salaRoutes.get("/",salaController.traerTodasLasSalas);

salaRoutes.get("/:sala",salaController.traerSala);


export default salaRoutes;