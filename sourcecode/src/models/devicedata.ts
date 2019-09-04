import { Document, model, Model, Schema, PaginateModel } from 'mongoose';
import mongoosePaginate = require('mongoose-paginate');

export interface DeviceDataType extends Document {
    deviceId: string,
    data: {},
    createdDate: Date,
    creator: string
}

const deviceSchema = new Schema({
    deviceId: String,
    data: {},
    createdDate: { type: Date, default: Date.now },
    creator: String
});

deviceSchema.plugin(mongoosePaginate);

interface Device<T extends Document> extends PaginateModel<T> { }

export const Device = model<DeviceDataType>("Device", deviceSchema);

export async function findDeviceData(DeviceId: string, dataId: string): Promise<DeviceDataType> {
    return new Promise<DeviceDataType>((resolve, reject) => {
        Device.findOne({ deviceId: DeviceId, _id: dataId }, (err, foundDeviceData: DeviceDataType) => {
            if (err)
                reject(err);
            else
                resolve(foundDeviceData);
        })
    })
}

export async function findManyDeviceData(DeviceId: string, pagenum: number, limitnum: number): Promise<DeviceDataType[]> {
    return new Promise<DeviceDataType[]>((resolve, reject) => {
        Device.paginate({ deviceId: DeviceId }, { page: pagenum, limit: limitnum }, (err, result) => {
            if (err)
                reject(err);
            else
                resolve(result.docs);
        })
    })
}

export async function saveDeviceData(deviceData: DeviceDataType): Promise<DeviceDataType> {
    return new Promise<DeviceDataType>((resolve, reject) => {
        deviceData.save((err, deviceData) => {
            if (err)
                reject(err);
            else
                resolve(deviceData);
        })
    })
}

export async function deleteDeviceData(DeviceId: string, dataId: string): Promise<DeviceDataType> {
    return new Promise<DeviceDataType>((resolve, reject) => {
        Device.remove({ deviceId: DeviceId, _id: dataId }, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        })
    })
}