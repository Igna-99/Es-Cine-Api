import { Usuario } from "../models/index.js";

class UsuarioController {

    constructor() { }

    traerTodosLosUsuarios = async (req, res, next) => {
        try {
            const result = await Usuario.findAll({
                attributes: ["idUsuario", "nombre", "apellido", "email", "contraseña"]
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

            const { idUsuario } = req.params;

            const result = await Usuario.findOne({
                attributes: ["idUsuario", "nombre", "apellido", "email", "contraseña"],
                where: {
                    idUsuario
                },
            });

            if (!result) {
                const error = new Error(`el usuarion con ID ${idUsuario} no se encuntra en la base de datos`);
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

            
            if (contraseña.length < 4) {
                const error = new Error("La contraseña debe tener mas de 4 caracteres")
                error.status = 400;
                throw error;
            }

            const result = await Usuario.create({ nombre, apellido, email, contraseña })

            if (!result) {
                const error = new Error("Error al crear el Usuario")
                error.status = 400;
                throw error;
            }

            res
                .status(200)
                .send({ success: true, message: "Usuario Creado Exitosamente", result })
        } catch (error) {

            next(error)
        }
    };

    login = async (req, res, next) => {
        try {

            const { email, contraseña } = req.body;

            const result = await Usuario.findOne({
                where: {
                    email,
                }
            });

            if (!result) {
                const error = new Error("El Email es incorrecto")
                error.status = 400;
                throw error;
            }

            const contraseñaCorrecta = await result.validarContraseña(contraseña)

            if (!contraseñaCorrecta) {
                const error = new Error("La Contraseña es incorrecta")
                error.status = 400;
                throw error;
            }

            res
                .status(200)
                .send({ success: true, message: "Usuario Logeado Exitosamente", result })
        } catch (error) {

            next(error)
        }
    };

    delete = async (req, res, next) => {
        try {

            const { email, contraseña } = req.body;

            const result = await Usuario.findOne({
                where: {
                    email,
                }
            });

            if (!result) {
                const error = new Error("El Email es incorrecto");
                error.status = 400;
                throw error;
            }

            const contraseñaCorrecta = await result.validarContraseña(contraseña);

            if (!contraseñaCorrecta) {
                const error = new Error("La Contraseña es incorrecta");
                error.status = 400;
                throw error;
            }


            const result2 = await Usuario.destroy({
                where: {
                    email
                },
            });

            if (!result) {
                const error = new Error(`ERROR FATAL`);
                error.status = 400;
                throw error;
            }


            res
                .status(200)
                .send({ success: true, message: "El usuario a sido eliminado", result2 });


        } catch (error) {

            next(error);
        }
    };


    //metodo viejo, fue remplazado por DELETE
    borrarUsuario = async (req, res, next) => {
        try {

            const { idUsuario } = req.params;

            const result = await Usuario.destroy({
                where: {
                    idUsuario
                },
            });

            if (!result) {
                const error = new Error(`el usuarion con ID ${idUsuario} no se encuntra en la base de datos`);
                error.status = 400;
                throw error;
            }

            res
                .status(200)
                .send({ success: true, message: "Usuarios Borrado", result });

        } catch (error) {

            next(error);
        }

    };


}

export default UsuarioController