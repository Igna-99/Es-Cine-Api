import { Router } from "express";

import ReservaController from "../controller/ReservaController.js";

import validateAccess from "../middleware/validateAccess.js"


const reservaController = new ReservaController();

const reservaRoutes = Router();


reservaRoutes.use(validateAccess);

reservaRoutes.get("/all" , reservaController.trearTodasLasReservasDeUsuario);

reservaRoutes.get("/:idReserva" , reservaController.trearReservaDeUsuario);

reservaRoutes.post("/create" , reservaController.crearReserva);



export default reservaRoutes;