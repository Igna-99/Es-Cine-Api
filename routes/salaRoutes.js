import { Router } from "express";
import SalaController from "../controller/SalasController.js";

const salaController = new SalaController();

const salaRoutes = Router();

salaRoutes.get("/",salaController.traerTodasLasSalas);




export default salaRoutes;