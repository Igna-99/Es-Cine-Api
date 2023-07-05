import { Usuario, Rol } from "../models/index.js";
import { generateToken, verifyToken } from "../utils/tokens.js";

class UsuarioController {

    constructor() { }

    traerTodosLosUsuarios = async (req, res, next) => {
        try {
            const result = await Usuario.findAll({
                attributes: ["idUsuario", "nombre", "apellido", "email", "contraseña"],
                include: [
                    {
                        model: Rol,
                        attributes: ["rol"],
                    },
                ],
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
                include: [
                    {
                        model: Rol,
                        attributes: ["rol"],
                    },
                ],
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

            const result = await Usuario.create({
                nombre,
                apellido,
                email,
                contraseña,
            })

            console.log("executing");

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
                const error = new Error("El Email es incorrecto");
                error.status = 400;
                throw error;
            }

            const contraseñaCorrecta = await result.validarContraseña(contraseña);

            if (!contraseñaCorrecta) {
                const error = new Error("La Contraseña es incorrecta");
                error.status = 400;
                throw error;
            };

            //tomamos los datos del usuario que necesitamos para generar el token
            const payload = {
                idUsuario: result.idUsuario,
                email: result.email,
                idRol: result.idRol
            };

            //generamos el token 
            const token = generateToken(payload);

            res.cookie('tokenCine',token)


            res
                .status(200)
                .send({ success: true, message: "Usuario Logeado Exitosamente", result });
        } catch (error) {

            next(error);
        }
    };

    logout = async (req, res, next) => {
        try {
            res.cookie('tokenCine','')

            res
                .status(200)
                .send({ success: true, message: 'Usuario Deslogueado' });

        } catch (error) {

            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { idUsuario } = req.user;

            const { email, contraseña } = req.body;

            const result = await Usuario.findOne({
                where: {
                    idUsuario,
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
                    idUsuario,
                    email,
                },
            });

            if (!result) {
                const error = new Error(`ERROR FATAL`);
                error.status = 400;
                throw error;
            }

            res.cookie('tokenCine','')

            res
                .status(200)
                .send({ success: true, message: "El usuario ha sido eliminado y deslogueado", result2 });


        } catch (error) {

            next(error);
        }
    };

    modificarUsuario = async (req, res, next) => {
        try {

            const { idUsuario } = req.user;

            const { nombre, apellido, email, contraseña } = req.body;

            let result = await Usuario.update(
                {
                    nombre,
                    apellido,
                    email,
                    contraseña,
                },
                {
                    where: {
                        idUsuario
                    },
                    individualHooks: true, //esto hace que se pueda usar el hook beforeUpdate
                }
            );

            // falta una forma de saber si fallo o no


            res.status(200).json({ message: "Usuario actualizados correctamente" });
        } catch (error) {

            next(error);
            console.log(error)
            console.log('No se puede modificar el usuario')
        }
    };

    me = async (req, res, next) => {
        try {

            const { user } = req

            res
            .status(200)
            .send({ success: true, message: "Usuario", user });
            
        } catch (error) {

            next(error);
            
        }
    }

} 

export default UsuarioController