import { Request, Response, NextFunction } from "express";
import { Game, findGameData, saveGameData, deleteGameData, findManyGameData } from '../models/gamedata'
import { Device, findDeviceData, saveDeviceData, deleteDeviceData, findManyDeviceData } from '../models/devicedata'
import { Test, findTestData, saveTestData, deleteTestData, findManyTestData } from '../models/testdata'
import * as httpStatus from '../utils/httpStatus';
import * as _ from 'lodash';

class DataController {

    async createGameData(req: Request, res: Response, next: NextFunction) {
        let game = new Game();

        game.gameId = _.get(req, 'params.gameId');
        game.data = _.get(req, 'body.data');
        game.creator = _.get(req, 'body.creator');

        if (_.isNull(game.data))
            return res.status(405).json({ message: httpStatus.default[405] });

        let result = await saveGameData(game);

        return res.status(200).json(result);
    }

    async readGameData(req: Request, res: Response, next: NextFunction) {
        let result = await findGameData(req.params.gameId, req.params.dataId);

        if (_.isNull(result))
            return res.status(404).send({ message: httpStatus.default[404] });
        res.status(200).json(result);
    }

    async modifyGameData(req: Request, res: Response, next: NextFunction) {
        let game = await findGameData(req.params.gameId, req.params.dataId);

        if (_.isNull(game))
            return res.status(404).send({ message: httpStatus.default[404] });

        game.gameId = _.get(req, 'params.gameId');
        game.data = _.get(req, 'body.data');
        game.creator = _.get(req, 'body.creator');

        if (_.isNull(game.data))
            return res.status(405).json({ message: httpStatus.default[405] });

        let result = await saveGameData(game);

        return res.status(200).json(result);
    }

    async deleteGameData(req: Request, res: Response, next: NextFunction) {
        let result = await findGameData(_.get(req, 'params.gameId'), _.get(req, 'params.dataId'));

        if (_.isNull(result))
            return res.status(404).send({ message: httpStatus.default[404] });

        await deleteGameData(_.get(req, 'params.gameId'), _.get(req, 'params.dataId'));
        res.status(200).end();
    }

    async readManyGameData(req: Request, res: Response, next: NextFunction) {

        let pagenum: number = 1;
        let limitnum: number = 10;

        if (_.get(req, 'query.page'))
            pagenum = _.get(req, 'query.page');
        if (_.get(req, 'query.limit'))
            limitnum = _.get(req, 'query.limit');

        if (pagenum >= 100)
            limitnum = 20;

        let result = await findManyGameData(_.get(req, 'params.gameId'), pagenum, limitnum);

        if (_.isEmpty(result))
            return res.status(404).send({ message: httpStatus.default[404] });
        res.status(200).json(result);
    }

    async createDeviceData(req: Request, res: Response, next: NextFunction) {
        let device = new Device();

        device.deviceId = _.get(req, 'params.deviceId');
        device.data = _.get(req, 'body.data');
        device.creator = _.get(req, 'body.creator');

        if (_.isNull(device.data))
            return res.status(405).json({ message: httpStatus.default[405] });

        let result = await saveDeviceData(device);

        return res.status(200).json(result);
    }

    async readDeviceData(req: Request, res: Response, next: NextFunction) {
        let result = await findDeviceData(req.params.deviceId, req.params.dataId);

        if (_.isNull(result))
            return res.status(404).send({ message: httpStatus.default[404] });
        res.status(200).json(result);
    }

    async modifyDeviceData(req: Request, res: Response, next: NextFunction) {
        let device = await findDeviceData(req.params.deviceId, req.params.dataId);

        if (_.isNull(device))
            return res.status(404).send({ message: httpStatus.default[404] });

        device.deviceId = _.get(req, 'params.deviceId');
        device.data = _.get(req, 'body.data');
        device.creator = _.get(req, 'body.creator');

        if (_.isNull(device.data))
            return res.status(405).json({ message: httpStatus.default[405] });

        let result = await saveDeviceData(device);

        return res.status(200).json(result);
    }

    async deleteDeviceData(req: Request, res: Response, next: NextFunction) {
        let result = await findDeviceData(_.get(req, 'params.deviceId'), _.get(req, 'params.dataId'));

        if (_.isNull(result))
            return res.status(404).send({ message: httpStatus.default[404] });

        await deleteDeviceData(_.get(req, 'params.deviceId'), _.get(req, 'params.dataId'));
        res.status(200).end();
    }

    async readManyDeviceData(req: Request, res: Response, next: NextFunction) {

        let pagenum: number = 1;
        let limitnum: number = 10;

        if (_.get(req, 'query.page'))
            pagenum = _.get(req, 'query.page');
        if (_.get(req, 'query.limit'))
            limitnum = _.get(req, 'query.limit');

        if (pagenum >= 100)
            limitnum = 20;

        let result = await findManyDeviceData(_.get(req, 'params.deviceId'), pagenum, limitnum);

        if (_.isEmpty(result))
            return res.status(404).send({ message: httpStatus.default[404] });
        res.status(200).json(result);
    }

    async createTestData(req: Request, res: Response, next: NextFunction) {
        let test = new Test();

        test.testId = _.get(req, 'params.testId');
        test.data = _.get(req, 'body.data');
        test.creator = _.get(req, 'body.creator');

        if (_.isNull(test.data))
            return res.status(405).json({ message: httpStatus.default[405] });

        let result = await saveTestData(test);

        return res.status(200).json(result);
    }

    async readTestData(req: Request, res: Response, next: NextFunction) {
        let result = await findTestData(req.params.testId, req.params.dataId);

        if (_.isNull(result))
            return res.status(404).send({ message: httpStatus.default[404] });
        res.status(200).json(result);
    }

    async modifyTestData(req: Request, res: Response, next: NextFunction) {
        let test = await findTestData(req.params.testId, req.params.dataId);

        if (_.isNull(test))
            return res.status(404).send({ message: httpStatus.default[404] });

        test.testId = _.get(req, 'params.testId');
        test.data = _.get(req, 'body.data');
        test.creator = _.get(req, 'body.creator');

        if (_.isNull(test.data))
            return res.status(405).json({ message: httpStatus.default[405] });

        let result = await saveTestData(test);

        return res.status(200).json(result);
    }

    async deleteTestData(req: Request, res: Response, next: NextFunction) {
        let result = await findTestData(_.get(req, 'params.testId'), _.get(req, 'params.dataId'));

        if (_.isNull(result))
            return res.status(404).send({ message: httpStatus.default[404] });

        await deleteTestData(_.get(req, 'params.testId'), _.get(req, 'params.dataId'));
        res.status(200).end();
    }

    async readManyTestData(req: Request, res: Response, next: NextFunction) {

        let pagenum: number = 1;
        let limitnum: number = 10;

        if (_.get(req, 'query.page'))
            pagenum = _.get(req, 'query.page');
        if (_.get(req, 'query.limit'))
            limitnum = _.get(req, 'query.limit');

        if (pagenum >= 100)
            limitnum = 20;

        let result = await findManyTestData(_.get(req, 'params.testId'), pagenum, limitnum);

        if (_.isEmpty(result))
            return res.status(404).send({ message: httpStatus.default[404] });
        res.status(200).json(result);
    }

    static build() {
        return new DataController();
    }
}

export default DataController;