const express = require('express');
const helmet = require('helmet')
const routes = require('./presentation/routes/Routes')

const app = express();
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

// Configuration files
// Ex: require("./path/to/file")(express, app)

module.exports = app;