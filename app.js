const express = require("express")
const bodyParser= require("body-parser")
const cors = require("cors")

const app = express()

const AuthRoutes = require("./routers/Auth")
const UserRoutes = require("./routers/Usuarios")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cors({
    origin: 'http://localhost:3000'
  }));


app.use("/api", AuthRoutes)
app.use("/api", UserRoutes)

module.exports = app