import { Request, Response, NextFunction } from "express";
import { Game } from '../models/gamedata'
import { Device } from '../models/devicedata'
import { Test } from '../models/testdata'
import * as httpStatus from '../utils/httpStatus';
import * as _ from 'lodash';

class DataController {

    async createGameData(req: Request, res: Response, next: NextFunction) {
        let game = new Game();

        game.gameId = _.get(req, 'params.gameId');
        game.data = _.get(req, 'body.data');
        game.creator = _.get(req, 'body.creator');

        if(_.isNull(game.data))
            return res.status(405).json({message : httpStatus.default[405]});

        game.save();

        await res.status(200);
    }

    async readGameData(req: Request, res: Response, next: NextFunction) {
        Game.find((err) => {
            if (err) return res.status(500).send({ error: 'database failure' });
            res.json(books);
        })
    }

    async modifyGameData(req: Request, res: Response, next: NextFunction) {
    }

    async deleteGameData(req: Request, res: Response, next: NextFunction) {
    }

    async readManyGameData(req: Request, res: Response, next: NextFunction) {
    }

    async createDeviceData(req: Request, res: Response, next: NextFunction) {
    }

    async readDeviceData(req: Request, res: Response, next: NextFunction) {
    }

    async modifyDeviceData(req: Request, res: Response, next: NextFunction) {
    }

    async deleteDeviceData(req: Request, res: Response, next: NextFunction) {
    }

    async readManyDeviceData(req: Request, res: Response, next: NextFunction) {
    }

    async createTestData(req: Request, res: Response, next: NextFunction) {
    }

    async readTestData(req: Request, res: Response, next: NextFunction) {
    }

    async modifyTestData(req: Request, res: Response, next: NextFunction) {
    }

    async deleteTestData(req: Request, res: Response, next: NextFunction) {
    }

    async readManyTestData(req: Request, res: Response, next: NextFunction) {
    }

    static build() {
        return new DataController();
    }
}

export default DataController;