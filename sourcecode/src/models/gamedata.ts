import { Document, model, Model, Schema, PaginateModel } from 'mongoose';
import mongoosePaginate = require('mongoose-paginate');

export interface GameDataType extends Document {
    gameId: string,
    data: {},
    createdDate: Date,
    creator: string
}

const gameSchema = new Schema({
    gameId: String,
    data: {},
    createdDate: { type: Date, default: Date.now },
    creator: String
});

gameSchema.plugin(mongoosePaginate);

interface Game<T extends Document> extends PaginateModel<T> { }

export const Game = model<GameDataType>("Game", gameSchema);

export async function findGameData(GameId: string, dataId: string): Promise<GameDataType> {
    return new Promise<GameDataType>((resolve, reject) => {
        Game.findOne({ gameId: GameId, _id: dataId }, (err, foundGameData: GameDataType) => {
            if (err)
                reject(err);
            else
                resolve(foundGameData);
        })
    })
}

export async function findManyGameData(GameId: string, pagenum: number, limitnum: number): Promise<GameDataType[]> {
    return new Promise<GameDataType[]>((resolve, reject) => {
        Game.paginate({ gameId: GameId }, { page: pagenum, limit: limitnum }, (err, result) => {
            if (err)
                reject(err);
            else
                resolve(result.docs);
        })
    })
}

export async function saveGameData(gameData: GameDataType): Promise<GameDataType> {
    return new Promise<GameDataType>((resolve, reject) => {
        gameData.save((err, gameData) => {
            if (err)
                reject(err);
            else
                resolve(gameData);
        })
    })
}

export async function deleteGameData(GameId: string, dataId: string): Promise<GameDataType> {
    return new Promise<GameDataType>((resolve, reject) => {
        Game.remove({ gameId: GameId, _id: dataId }, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        })
    })
}