import { Document, model, Model, Schema, PaginateModel } from 'mongoose';
import mongoosePaginate = require('mongoose-paginate');

export interface deviceData extends Document {
    gameId: string,
    data: {},
    createdDate: Date,
    creator: string
}

const deviceSchema = new Schema({
    gameId: String,
    data: {},
    createdDate: { type: Date, default: Date.now },
    creator: String
});

deviceSchema.plugin(mongoosePaginate);

interface Device<T extends Document> extends PaginateModel<T> { }

export const Device = model<deviceData>("Device", deviceSchema);

export async function saveDeviceData():Promise<void> {
    return new Promise((resolve, reject) => {
        
    })
}