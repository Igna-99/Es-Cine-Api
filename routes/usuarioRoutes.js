import { Router } from "express";

import UsuarioController from "../controller/UsuarioController.js";
import ReservaController from "../controller/ReservaController.js";

const usuarioController = new UsuarioController()
const reservaController = new ReservaController()


const usuarioRoutes = Router();


//

usuarioRoutes.get("/:idUsuario", usuarioController.traerUsuarioPorId)

usuarioRoutes.get("/", usuarioController.traerTodosLosUsuarios)

usuarioRoutes.post("/login", usuarioController.login)

usuarioRoutes.post("/", usuarioController.crearUsuario)

usuarioRoutes.put("/:idUsuario", usuarioController.modificarUsuario)

usuarioRoutes.delete("/", usuarioController.delete)

//

usuarioRoutes.get("/:idUsuario/reserva",reservaController.trearReservaDeUsuario)

usuarioRoutes.post("/:idUsuario/reserva", reservaController.crearReserva)


export default usuarioRoutes