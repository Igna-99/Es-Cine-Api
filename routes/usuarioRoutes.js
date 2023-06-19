import { Router } from "express";
import UsuarioController from "../controller/UsuarioController.js";

const usuarioController = new UsuarioController()

const usuarioRoutes = Router();


usuarioRoutes.get("/", usuarioController.traerTodosLosUsuarios)

usuarioRoutes.get("/:id", usuarioController.traerUsuarioPorId)

usuarioRoutes.post("/", usuarioController.crearUsuario)


export default usuarioRoutes