const mongoose = require('mongoose');
//const { DB_NAME, DB_PASSWORD, DB_USER, DB_HOST } = require('./constantes');
const app = require("./app");

const dbURL = `mongodb+srv://jesus:Zeuschela1@morgue-prueba.tp72al1.mongodb.net/userspass`;

const PORT = process.env.PORT || 4000;

mongoose.connect(dbURL, {

})
.then(() => {
  console.log("Conectado a la base de datos en línea");
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
})
.catch(err => console.error("Error al conectar a la base de datos:", err));
