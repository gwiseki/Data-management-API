import { Express } from "express";
import DataController from "../controllers/controller";

function userRoute(app: Express, dataController = DataController.build()) {

    app.route("/api/v1/games/:gameId/data")
        .post(dataController.createGameData);

    app.route("/api/v1/games/:gameId/data/:dataId")
        .get(dataController.readGameData);

    app.route("/api/v1/games/:gameId/data/:dataId")
        .patch(dataController.modifyGameData);

    app.route("/api/v1/games/:gameId/data/:dataId")
        .delete(dataController.deleteGameData);

    app.route("/api/v1/games/:gameId/data")
        .get(dataController.readManyGameData);

    app.route("/api/v1/devices/:deviceId/data")
        .post(dataController.createDeviceData);

    app.route("/api/v1/devices/:deviceId/data/:dataId")
        .get(dataController.readDeviceData);

    app.route("/api/v1/devices/:deviceId/data/:dataId")
        .patch(dataController.modifyDeviceData);

    app.route("/api/v1/devices/:deviceId/data/:dataId")
        .delete(dataController.deleteDeviceData);

    app.route("/api/v1/devices/:deviceId/data")
        .get(dataController.readManyDeviceData);

    app.route("/api/v1/tests/:testId/data")
        .post(dataController.createTestData);

    app.route("/api/v1/tests/:testId/data/:dataId")
        .get(dataController.readTestData);

    app.route("/api/v1/tests/:testId/data/:dataId")
        .patch(dataController.modifyTestData);

    app.route("/api/v1/tests/:testId/data/:dataId")
        .delete(dataController.deleteTestData);

    app.route("/api/v1/tests/:testId/data")
        .get(dataController.readManyTestData);
}

export default userRoute;
