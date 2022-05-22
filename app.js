require('dotenv').config() //
const express = require('express') //lib untuk service database
const app = express()
const cors = require('cors') //agar host local dapat akses ke service kita 
const routes = require('./routes') //routingan dari service
const errHandler = require('./middleware/errorHandler') //tempat menampung error
const db = require("./models");

db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {

    console.log("Drop and re-sync db.");

});

app.use(cors())
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use(routes)

app.use(errHandler)

module.exports = app