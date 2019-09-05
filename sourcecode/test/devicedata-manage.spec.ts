import * as chai from 'chai'
import chaiHttp from 'chai-http';
import { connectMongoose, disconnectMongoose } from './helper/server';
import { Device } from '../src/models/devicedata';
import server = require('../src/server');

chai.use(chaiHttp);
let should = chai.should();

describe('1. 사용자는 특정 장치에 의존성을 갖는 데이터를 관리할 수 있어야 한다.', () => {

    before(async () => {
        await connectMongoose();
    })

    after(async () => {
        await disconnectMongoose();
    })

    describe('장치 데이터 생성', () => {

        after(async () => {
            await Device.deleteMany({}, (err) => {
            })
        })

        let exampleDeviceId: string = 'exampleDeviceId001';

        it('장치 데이터를 생성할 수 있어야 한다.', async () => {

            let data = {
                'data': {
                    'ID': 'id1',
                    'pw': 'pw1',
                    'using': true
                },
                'creator': 'hk'
            }

            let res = await chai.request(server)
                .post(`/api/v1/devices/${exampleDeviceId}/data`)
                .send(data)

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('deviceId', '_id', 'createdDate');
            res.body.should.have.property('data').have.nested.property('ID').to.eql('id1');
            res.body.should.have.property('data').have.nested.property('pw').to.eql('pw1');
            res.body.should.have.property('data').have.nested.property('using').to.eql(true);
            res.body.should.have.property('creator').to.eql('hk');
        })

        it('장치 데이터를 생성할 수 없어야 한다.', async () => {

            let dummyDeviceData = {
                'creator': 'hk'
            }

            let res = await chai.request(server)
                .post(`/api/v1/devices/${exampleDeviceId}/data`)
                .send(dummyDeviceData)

            res.should.have.status(405);
        })
    })

    describe('장치 데이터 조회', () => {

        let exampleDeviceId: string = 'exampleDeviceId001';
        let testDeviceDataId: string;
        let dummyDeviceId: string = 'dummydeviceid001';
        let dummyDeviceDataId: string = 'dummydevicedataid001';

        before(async () => {
            let deviceData = new Device({
                'deviceId': exampleDeviceId,
                'data': {
                    'ID': 'id1',
                    'pw': 'pw1',
                    'using': true
                },
                'creator': 'hk'
            });

            await deviceData.save((err, deviceData) => {
                testDeviceDataId = deviceData._id
            });
        })

        after(async () => {
            await Device.deleteMany({}, (err) => {
            })
        })

        it('장치 데이터를 읽을 수 있어야 한다.(단일 데이터 조회 기능 테스트)', async () => {
            let res = await chai.request(server)
                .get(`/api/v1/devices/${exampleDeviceId}/data/${testDeviceDataId}`)

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('_id', 'createdDate');
            res.body.should.have.property('deviceId').to.eql(exampleDeviceId);
            res.body.should.have.property('data').have.nested.property('ID').to.eql('id1');
            res.body.should.have.property('data').have.nested.property('pw').to.eql('pw1');
            res.body.should.have.property('data').have.nested.property('using').to.eql(true);
            res.body.should.have.property('creator').to.eql('hk');
        })

        it('장치 데이터를 읽을 수 있어야 한다.(복수 데이터 조회 기능 테스트)', async () => {
            let res = await chai.request(server)
                .get(`/api/v1/devices/${exampleDeviceId}/data`)

            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.should.have.length(1);
            (res.body[0]).should.have.all.keys('_id', 'createdDate');
            (res.body[0]).should.have.property('deviceId').to.eql(exampleDeviceId);
            (res.body[0]).should.have.property('data').have.nested.property('ID').to.eql('id1');
            (res.body[0]).should.have.property('data').have.nested.property('pw').to.eql('pw1');
            (res.body[0]).should.have.property('data').have.nested.property('using').to.eql(true);
            (res.body[0]).should.have.property('creator').to.eql('hk');
        })

        it('장치 데이터를 읽을 수 없어야 한다.', async () => {
            let res = await chai.request(server)
                .get(`/api/v1/devices/${dummyDeviceId}/data/${dummyDeviceDataId}`)

            res.should.have.status(404);
        })
    })

    describe('장치 데이터 수정', () => {
        let exampleDeviceId: string = 'exampleDeviceId001';
        let exampleDeviceId2: string = 'exampleDeviceId002';
        let testDeviceDataId: string;

        let dummyDeviceId: string = 'dummydeviceid001';
        let dummyDeviceDataId: string = 'dummydevicedataid001';

        let deviceData = new Device({
            'deviceId': exampleDeviceId,
            'data': {
                'ID': 'id1',
                'pw': 'pw1',
                'using': true
            },
            'creator': 'hk'
        });

        let deviceData2 = new Device({
            'deviceId': exampleDeviceId2,
            'data': {
                'ID': 'id2',
                'pw': 'pw2',
                'using': false
            },
            'creator': 'hk'
        });

        let dummyDeviceDta = {
            'creator': 'hk'
        }

        beforeEach(async () => {
            await deviceData.save((err, deviceData) => {
                testDeviceDataId = deviceData._id
            });
        })

        afterEach(async () => {
            await Device.deleteMany({}, (err) => {
            })
        })

        it('장치 데이터를 수정할 수 있어야 한다.', async () => {
            let res = await chai.request(server)
                .patch(`/api/v1/devices/${exampleDeviceId}/data/${testDeviceDataId}`)
                .send(deviceData2)

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('_id', 'createdDate');
            res.body.should.have.property('deviceId').to.eql(exampleDeviceId2);
            res.body.should.have.property('data').have.nested.property('ID').to.eql('id2');
            res.body.should.have.property('data').have.nested.property('pw').to.eql('pw2');
            res.body.should.have.property('data').have.nested.property('using').to.eql(false);
            res.body.should.have.property('creator').to.eql('hk');
        })

        it('장치 데이터를 수정할 수 없어야 한다.(수정 대상 데이터가 존재하지 않는 경우)', async () => {
            let res = await chai.request(server)
                .patch(`/api/v1/devices/${dummyDeviceId}/data/${dummyDeviceDataId}`)
                .send(deviceData2)

            res.should.have.status(404);
        })

        it('장치 데이터를 수정할 수 없어야 한다.(data 필드가 존재하지 않는 경우)', async () => {
            let res = await chai.request(server)
                .patch(`/api/v1/devices/${exampleDeviceId}/data/${testDeviceDataId}`)
                .send(dummyDeviceDta)

            res.should.have.status(405);
        })
    })

    describe('장치 데이터 삭제', () => {

        let exampleDeviceId: string = 'exampleDeviceId001';
        let testDeviceDataId: string;
        let dummyDeviceId: string = 'dummydeviceid001';
        let dummyDeviceDataId: string = 'dummydevicedataid001';

        let deviceData = new Device({
            'deviceId': exampleDeviceId,
            'data': {
                'ID': 'id1',
                'pw': 'pw1',
                'using': true
            },
            'creator': 'hk'
        });

        before(async () => {
            await deviceData.save((err, deviceData) => {
                testDeviceDataId = deviceData._id
            });
        })

        after(async () => {
            await Device.deleteMany({}, (err) => {
            })
        })

        it('장치 데이터를 삭제할 수 있어야 한다.', async () => {
            let res1 = await chai.request(server)
                .delete(`/api/v1/devices/${exampleDeviceId}/data/${testDeviceDataId}`)

            res1.should.have.status(200);
            
            let res2 = await chai.request(server)
                .get(`/api/v1/devices/${exampleDeviceId}/data/${exampleDeviceId}`)

            res2.should.have.status(404);
        })

        it('장치 데이터를 삭제할 수 없어야 한다.', async () => {
            let res = await chai.request(server)
                .delete(`/api/v1/devices/${dummyDeviceId}/data/${dummyDeviceDataId}`)

            res.should.have.status(404);
        })

    })

})
