import { Usuario } from "../Models/index.js"

class UsuarioController {

    constructor() {}

    traerTodosLosUsuarios = async (req, res, next) => {
        try {
            const result = await Usuario.findAll({
                attributes: ["id", "nombre", "apellido", "email", "contraseña"]
            });

            if (result.length == 0) {
                const error = new Error("no hay usuarios cargados aun");
                error.status = 400
                throw error
            }

            res
                .status(200)
                .send({ success: true, message: "usuarios encontrados:", result })

        } catch (error) {
            next(error)
        }
    };

    traerUsuarioPorId = async (req, res, next) => {
        try {

            const { id } = req.params;

            const result = await Usuario.findOne({
                attributes: ["id", "nombre", "apellido", "email", "contraseña"],
                where: {
                    id
                },
            });

            if (!result) {
                const error = new Error(`el usuarion con ID ${id} no se encuntra en la base de datos`);
                error.status = 400;
                throw error;
            } 

            res
                .status(200)
                .send({ success: true, message: "usuarios encontrados:", result });

        } catch (error) {

            next(error);
        }

    };

    crearUsuario = async (req, res, next) => {
        try {
            
            const { nombre, apellido, email, contraseña } = req.body
            const result = await Usuario.create({ nombre, apellido, email, contraseña })

            if (!result) {
                const error = new Error("ERROR AL CREAR EL USUARIO")
                error.status = 400;
                throw error;
            } 

            res
                .status(200)
                .send({ success: true, message: "Usuario Creado Exitosamente" })
        } catch (error) {

            next(error)
        }
    };

}

export default UsuarioController