import { Express } from "express";
import homeRoutes from "./routes/home";
import userRoutes from "./routes/user";

export default function registerRoutes(app: Express) {
    homeRoutes(app);
    userRoutes(app);
}