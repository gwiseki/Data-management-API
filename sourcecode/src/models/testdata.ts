import { Document, model, Model, Schema, PaginateModel } from 'mongoose';
import mongoosePaginate = require('mongoose-paginate');

export interface TestDataType extends Document {
    testId: string,
    data: {},
    createdDate: Date,
    creator: string
}

export const testSchema = new Schema({
    testId: String,
    data: {},
    createdDate: { type: Date, default: Date.now  },
    creator: String
});

testSchema.plugin(mongoosePaginate);

interface Test<T extends Document> extends PaginateModel<T> { }

export const Test = model<TestDataType>("Test", testSchema);

export async function findTestData(TestId: string, dataId: string): Promise<TestDataType> {
    return new Promise<TestDataType>((resolve, reject) => {
        Test.findOne({ testId: TestId, _id: dataId }, (err, foundTestData: TestDataType) => {
            if (err)
                reject(err);
            else
                resolve(foundTestData);
        })
    })
}

export async function findManyTestData(TestId: string, pagenum: number, limitnum: number): Promise<TestDataType[]> {
    return new Promise<TestDataType[]>((resolve, reject) => {
        Test.paginate({ testId: TestId }, { page: pagenum, limit: limitnum }, (err, result) => {
            if (err)
                reject(err);
            else
                resolve(result.docs);
        })
    })
}

export async function saveTestData(testData: TestDataType): Promise<TestDataType> {
    return new Promise<TestDataType>((resolve, reject) => {
        testData.save((err, testData) => {
            if (err)
                reject(err);
            else
                resolve(testData);
        })
    })
}

export async function deleteTestData(TestId: string, dataId: string): Promise<TestDataType> {
    return new Promise<TestDataType>((resolve, reject) => {
        Test.remove({ TestId: TestId, _id: dataId }, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        })
    })
}