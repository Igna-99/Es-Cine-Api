import { Router } from "express";

import UsuarioController from "../controller/UsuarioController.js";
import ReservaController from "../controller/ReservaController.js";

const usuarioController = new UsuarioController()
const reservaController = new ReservaController()

const usuarioRoutes = Router();


usuarioRoutes.get("/", usuarioController.traerTodosLosUsuarios)

usuarioRoutes.get("/:id", usuarioController.traerUsuarioPorId)

usuarioRoutes.post("/login", usuarioController.login)

usuarioRoutes.post("/", usuarioController.crearUsuario)

usuarioRoutes.delete("/", usuarioController.delete)



usuarioRoutes.get("/:idUusario/reserva",reservaController.trearReservaDeUsuario)

usuarioRoutes.post("/:idUusario/reserva", reservaController.crearReserva)

usuarioRoutes.delete("/:idUusario/reserva", reservaController.eliminarReserva)



export default usuarioRoutes