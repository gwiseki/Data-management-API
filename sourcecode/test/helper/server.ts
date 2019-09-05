import * as mongoose from 'mongoose';
import config from "config";

export async function connectMongoose(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        mongoose.connect(config.get('database.dbconnection'), (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    })
}

export async function disconnectMongoose(): Promise<void> {
    return new Promise<void>((resolve, reject) => { //db.close
        mongoose.connection.close((err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    })
}