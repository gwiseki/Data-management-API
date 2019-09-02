import { Document, model, Model, Schema, PaginateModel } from 'mongoose';
import mongoosePaginate = require('mongoose-paginate');

export interface testData extends Document {
    gameId: string,
    data: {},
    createdDate: Date,
    creator: string
}

export const testSchema = new Schema({
    gameId: String,
    data: {},
    createdDate: { type: Date, default: Date.now  },
    creator: String
});

testSchema.plugin(mongoosePaginate);

interface Test<T extends Document> extends PaginateModel<T> { }

export const Test = model<testData>("Test", testSchema);
