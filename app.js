import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import routes from './presentation/routes/Routes.js';

const app = express();
app.use(helmet())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(routes)

// Configuration files
// Ex: require("./path/to/file")(express, app)

export default app;