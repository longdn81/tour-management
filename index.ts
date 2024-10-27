import express, { Express} from "express";
import dotenv from "dotenv";
import clientRoutes from "./routers/client/index.route";
import moment = require("moment");
import adminRoutes from "./routers/admin/index.route";
import { systemConfig } from "./config/config";


dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set('views', `./views`)
app.set('view engine', 'pug')

// app local variable
app.locals.moment =moment ;
app.locals.prefixAdmin = systemConfig.prefixAdmin ;

// clientRoutes
clientRoutes(app);


// adminRoutes
adminRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`); 
});