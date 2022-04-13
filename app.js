const express = require('express');
const routes = require('./presentation/routes/routes')

const app = express();
app.use(routes)

// Configuration files
// Ex: require("./path/to/file")(express, app)

module.exports = app;