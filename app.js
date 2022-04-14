const express = require('express');
const routes = require('./presentation/routes/customer.js')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

// Configuration files
// Ex: require("./path/to/file")(express, app)

module.exports = app;