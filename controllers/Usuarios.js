const User= require("../models/user")
const  bcrypt=require("bcryptjs")

async function obtenerUserLogued(req, res){
    const {usuario_id}= req.usuario

    const response = await User.finfById(usuario_id)

    if(!response){
        res.status(400).send({
            msg:"No existe el usuario"
        })
    }else{
        res.status(200).send(response)
    }
}

async function createUser(req, res){
    const {password}= req.body

    const user=new User({...req.body, active:true})

    const salt= bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    user.password = hashPassword

    const guardarUser = await user.save()
    res.status(200).send(guardarUser)
}


module.exports={
    obtenerUserLogued,
    createUser
}