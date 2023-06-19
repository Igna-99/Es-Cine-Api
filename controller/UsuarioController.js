import { Usuario } from "../Models/index.js"

class UsuarioController {

    constructor() {}

    traerTodosLosUsuarios = async (req, res, next) => {
        try {
            const result = await Usuario.findAll({
                attributes:["id","nombre","apellido","email","contraseña"]
            })
            result 
            res
            .status(200)
            .send({ success: true, message: "usuarios encontrados:", result})
        } catch (error) {
            res
            .status(400)
            .send({ success: false, message: error.message})
        }
    };

    traerUsuarioPorId = async (req, res, next) => {
        try {
            const { id } = req.params
            const result = await Usuario.findOne({
                attributes:["id","nombre","apellido","email","contraseña"],
                where: {
                    id
                },
            })
            if(!result) throw new Error("No se encontro al usuario") 
            res
            .status(200)
            .send({ success: true, message: "usuarios encontrados:", result})
        } catch (error) {
            res
            .status(400)
            .send({ success: false, message: error.message})
        }

    };

    crearUsuario = async (req, res, next) => {
        try {
            const { nombre, apellido, email, contraseña } = req.body
            const result = await Usuario.create({ nombre, apellido, email, contraseña })

            if (!result) throw new Error("ERROR AL CREAR EL USUARIO")

            res
            .status(200)
            .send({ success: true, message: "Usuario Creado Exitosamente" })
        } catch (error) {
            res
            .status(400)
            .send({ success: false, message: error.message})
        }
    };

}

export default UsuarioController