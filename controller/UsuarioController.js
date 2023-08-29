import { Usuario, Rol } from "../models/index.js";
import { generateToken, verifyToken } from "../utils/tokens.js";

class UsuarioController {

    constructor() { }

    traerTodosLosUsuarios = async (req, res, next) => {
        try {
            const result = await Usuario.findAll({
                attributes: ["idUsuario", "nombre", "apellido", "email", "contraseña","habilitado"],
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
                attributes: ["idUsuario", "nombre", "apellido", "email", "contraseña","habilitado"],
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
                nombre: nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase(),
                apellido: apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase(),
                email,
                contraseña,
            })

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

            if (!result.dataValues.habilitado) {
                const error = new Error("El Usuario se encuentra inhabilitado");
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
                nombre: result.nombre,
                apellido: result.apellido,
                email: result.email,
                idRol: result.idRol,
                habilitado: result.habilitado
            };

            //generamos el token 
            const token = generateToken(payload);

            res.cookie('tokenCine', token)


            res
                .status(200)
                .send({ success: true, message: "Usuario Logeado Exitosamente", payload });
        } catch (error) {

            next(error);
        }
    };

    logout = async (req, res, next) => {
        try {
            res.cookie('tokenCine', '')

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

            res.cookie('tokenCine', '')

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
    };

    grantAdminRole = async (req, res, next) => {
        try {
            const { idUsuario } = req.body;

            const usuario = await Usuario.findOne({
                where: {
                    idUsuario,
                }
            });

            if (!usuario) {
                const error = new Error(`No existe Usuario con el id ${idUsuario}`);
                error.status = 400;
                throw error;
            }

            if (usuario.dataValues.idRol == 1) {
                const error = new Error(`El Usuario con el id ${idUsuario} ya es Admin`);
                error.status = 400;
                throw error;
            }

            await Usuario.update({ idRol: 1 }, {
                where: {
                    idUsuario
                }
            });

            res
                .status(200)
                .send({ success: true, message: `El Usuario con el id ${idUsuario} ahora es Admin` });

        } catch (error) {

            next(error);

        }
    };

    removeAdminRole = async (req, res, next) => {
        try {
            const { idUsuario } = req.body;

            const { user } = req

            if (user.idUsuario == idUsuario) {
                const error = new Error(`no puedes quitarte el rol de Admin a ti mismo`);
                error.status = 400;
                throw error;
            }

            const usuario = await Usuario.findOne({
                where: {
                    idUsuario,
                }
            });

            if (!usuario) {
                const error = new Error(`No existe Usuario con el id ${idUsuario}`);
                error.status = 400;
                throw error;
            }

            if (usuario.dataValues.idRol == 2) {
                const error = new Error(`El Usuario con el id ${idUsuario} no es Admin`);
                error.status = 400;
                throw error;
            }

            await Usuario.update({ idRol: 2 }, {
                where: {
                    idUsuario
                }
            });


            res
                .status(200)
                .send({ success: true, message: `El Usuario con el id ${idUsuario} ya no es Admin` });

        } catch (error) {
            next(error);
        }
    };

    disableUser = async (req, res, next) => {
        try {
            const { idUsuario } = req.body;
            const { user } = req

            if (user.idUsuario == idUsuario) {
                const error = new Error(`no puedes Deshabilitar tu propio Usuario`);
                error.status = 400;
                throw error;
            }

            const usuario = await Usuario.findOne({
                where: {
                    idUsuario,
                }
            });

            if (!usuario) {
                const error = new Error(`No existe Usuario con el id ${idUsuario}`);
                error.status = 400;
                throw error;
            }

            if (usuario.dataValues.habilitado == false) {
                const error = new Error(`El Usuario con el id ${idUsuario} ya se encuentra Deshabilitado`);
                error.status = 400;
                throw error;
            }

            await Usuario.update({ habilitado: false }, {
                where: {
                    idUsuario
                }
            });

            res
                .status(200)
                .send({ success: true, message: `El Usuario con el id ${idUsuario} ahora se encuentra deshabilitado` });

        } catch (error) {

            next(error);

        }
    };

    enableUser = async (req, res, next) => {
        try {
            const { idUsuario } = req.body;

            const usuario = await Usuario.findOne({
                where: {
                    idUsuario,
                }
            });

            if (!usuario) {
                const error = new Error(`No existe Usuario con el id ${idUsuario}`);
                error.status = 400;
                throw error;
            }

            if (usuario.dataValues.habilitado == true) {
                const error = new Error(`El Usuario con el id ${idUsuario} ya esta habilitado`);
                error.status = 400;
                throw error;
            }

            await Usuario.update({ habilitado: true }, {
                where: {
                    idUsuario
                }
            });

            res
                .status(200)
                .send({ success: true, message: `El Usuario con el id ${idUsuario} se encuentra Habilitado nuevamente`});

        } catch (error) {

            next(error);

        }
    }

}

export default UsuarioController