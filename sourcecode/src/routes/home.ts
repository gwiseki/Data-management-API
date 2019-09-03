import { Request, Response, NextFunction, Express } from "express";

function homeRoutes(app :Express) {

    app.route("/api/v1")
        .get(function (req: Request, res: Response, next: NextFunction) {
            res.send("Welcome to data management API v1");
        });
}

export default homeRoutes;
