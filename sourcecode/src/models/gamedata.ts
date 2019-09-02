import { Document, model, Model, Schema, PaginateModel } from 'mongoose';
import mongoosePaginate = require('mongoose-paginate');

export interface gameData extends Document {
    gameId: string,
    data: {},
    createdDate: Date,
    creator: string
}

const gameSchema = new Schema({
    gameId: String,
    data: {},
    createdDate: { type: Date, default: Date.now  },
    creator: String
});

gameSchema.plugin(mongoosePaginate);

interface Game<T extends Document> extends PaginateModel<T> { }

export const Game = model<gameData>("Game", gameSchema);