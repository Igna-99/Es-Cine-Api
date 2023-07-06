import { Router } from "express";
import UsuarioController from "../controller/UsuarioController.js";

import validateAccess from "../middleware/validateAccess.js";
import isAdmin from "../middleware/isAdmin.js";


const usuarioController = new UsuarioController();


const usuarioRoutes = Router();


//sin necesidad de logueo


usuarioRoutes.post("/create", usuarioController.crearUsuario);

usuarioRoutes.post("/login", usuarioController.login);


//con necesidad de logueo
usuarioRoutes.use(validateAccess);


usuarioRoutes.get("/me", usuarioController.me);

usuarioRoutes.post("/logout", usuarioController.logout);

usuarioRoutes.put("/", usuarioController.modificarUsuario);

usuarioRoutes.delete("/", usuarioController.delete);


//con necesidad de ser admin
usuarioRoutes.use(isAdmin);


usuarioRoutes.get("/all", usuarioController.traerTodosLosUsuarios);

usuarioRoutes.get("/:idUsuario", usuarioController.traerUsuarioPorId);



export default usuarioRoutes