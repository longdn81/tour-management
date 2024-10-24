import express, { Express} from "express";
import dotenv from "dotenv";
import clientRoutes from "./routers/client/index.route";

dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.static("public"));

app.set('views', `./views`)
app.set('view engine', 'pug')

// clientRoutes
clientRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`); 
});