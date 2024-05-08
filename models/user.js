 const mongoose =require("mongoose")

 const userSchema=mongoose.Schema({
    nombreusuario:{
        type:String,
        unique:true
    },
    apellidos:String,
    password:String,
    role:String,
    active:Boolean,
 })

 module.exports=mongoose.model("User", userSchema)