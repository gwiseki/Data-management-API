import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import config from "config";
import registerRoutes from "./registerRoutes";

export const app: express.Express = express();

//if(process.NODE_ENV != test)
app.use(morgan("dev"));

app.use((error: any, req: express.Request, res: express.Response) => {
    return res.json({ message: error.message });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(config.get('database.dbconnection'));

registerRoutes(app);

export default app;
