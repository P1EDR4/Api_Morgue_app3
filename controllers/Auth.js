const User=require("../models/user")
const bcrypt= require('bcryptjs')
const jwt= require("../utils/jwt")

async function Registrar(req,res){
    const {nombreusuario, apellidos, password}=req.body

    try {
        if(!nombreusuario) res.status(400).send({msg:"El nombreusuario es obligatorio"})
        if(!password) res.status(400).send({msg:"El password es obligatorio"})

        const usuario= new User({
            nombreusuario,
            apellidos,
            role:"admin",
            active: true

        })
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt);

        usuario.password = hashPassword

        await usuario.save().then(()=>{
            res.status(200).send({msg:"Datos guardados correctamente"})
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg:"No se guardo la informacion"
        })
    }
}

async function Login(req, res) {
    const { nombreusuario, password } = req.body;

    try {
        if (!nombreusuario) throw { statusCode: 400, msg: "El nombre de usuario es obligatorio" };
        if (!password) throw { statusCode: 400, msg: "El password es obligatorio" };

        const response = await User.findOne({ nombreusuario });

        if (!response) throw { statusCode: 404, msg: "Usuario no encontrado" };

        const passwordMatch = await bcrypt.compare(password,response.password);
        console.log(password);

        bcrypt.compare(password, response.password, (bcryptError, check)=>{
            if(bcryptError){
                res.status(500).send({msg:"Error del usuario"})
            }else if(!check){
                res.status(400).send({msg:"Password incorrecto"})
            }else if(!response.active){
                res.status(400).send({msg:"Usuario inactivo"})
            }else{
                res.status(200).send({
                access: jwt.createAccessToken(response),
                refresh: jwt.createRefreshToken(response)
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).send({ msg: error.msg || "Error al autenticar" });
    }
}


async function refreshAccessToken(req, res) {
    const { token } = req.body;
    if (!token) res.status(400).send({ msg: "Token requerido" });

    const { usuario_id } = jwt.decoded(token);

    try {

        const response = await User.findOne({ _id: usuario_id });

        res.status(200).send({
            accessToken: jwt.createAccessToken(response)
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Error del servidor" });
    }
}

module.exports = {
    Registrar,
    Login,
    refreshAccessToken
}