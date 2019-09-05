import * as chai from 'chai'
import chaiHttp from 'chai-http';
import { connectMongoose, disconnectMongoose } from './helper/server';
import { Test } from '../src/models/testdata';
import server = require('../src/server');

chai.use(chaiHttp);
let should = chai.should();

describe('1. 사용자는 특정 게임에 의존성을 갖는 데이터를 관리할 수 있어야 한다.', () => {

    before(async () => {
        await connectMongoose();
    })

    after(async () => {
        await disconnectMongoose();
    })

    describe('게임 데이터 생성', () => {

        after(async () => {
            await Test.deleteMany({}, (err) => {
            })
        })

        let exampleTestId: string = 'exampleTestId001';

        it('게임 데이터를 생성할 수 있어야 한다.', async () => {

            let data = {
                'data': {
                    'ID': 'id1',
                    'pw': 'pw1',
                    'using': true
                },
                'creator': 'hk'
            }

            let res = await chai.request(server)
                .post(`/api/v1/tests/${exampleTestId}/data`)
                .send(data)

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('testId', '_id', 'createdDate');
            res.body.should.have.property('data').have.nested.property('ID').to.eql('id1');
            res.body.should.have.property('data').have.nested.property('pw').to.eql('pw1');
            res.body.should.have.property('data').have.nested.property('using').to.eql(true);
            res.body.should.have.property('creator').to.eql('hk');
        })

        it('게임 데이터를 생성할 수 없어야 한다.', async () => {

            let dummyTestData = {
                'creator': 'hk'
            }

            let res = await chai.request(server)
                .post(`/api/v1/tests/${exampleTestId}/data`)
                .send(dummyTestData)

            res.should.have.status(405);
        })
    })

    describe('게임 데이터 조회', () => {

        let exampleTestId: string = 'exampleTestId001';
        let testTestDataId: string;
        let dummyTestId: string = 'dummytestid001';
        let dummyTestDataId: string = 'dummytestdataid001';

        before(async () => {
            let testData = new Test({
                'testId': exampleTestId,
                'data': {
                    'ID': 'id1',
                    'pw': 'pw1',
                    'using': true
                },
                'creator': 'hk'
            });

            await testData.save((err, testData) => {
                testTestDataId = testData._id
            });
        })

        after(async () => {
            await Test.deleteMany({}, (err) => {
            })
        })

        it('게임 데이터를 읽을 수 있어야 한다.(단일 데이터 조회 기능 테스트)', async () => {
            let res = await chai.request(server)
                .get(`/api/v1/tests/${exampleTestId}/data/${testTestDataId}`)

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('_id', 'createdDate');
            res.body.should.have.property('testId').to.eql(exampleTestId);
            res.body.should.have.property('data').have.nested.property('ID').to.eql('id1');
            res.body.should.have.property('data').have.nested.property('pw').to.eql('pw1');
            res.body.should.have.property('data').have.nested.property('using').to.eql(true);
            res.body.should.have.property('creator').to.eql('hk');
        })

        it('게임 데이터를 읽을 수 있어야 한다.(복수 데이터 조회 기능 테스트)', async () => {
            let res = await chai.request(server)
                .get(`/api/v1/tests/${exampleTestId}/data`)

            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.should.have.length(1);
            (res.body[0]).should.have.all.keys('_id', 'createdDate');
            (res.body[0]).should.have.property('testId').to.eql(exampleTestId);
            (res.body[0]).should.have.property('data').have.nested.property('ID').to.eql('id1');
            (res.body[0]).should.have.property('data').have.nested.property('pw').to.eql('pw1');
            (res.body[0]).should.have.property('data').have.nested.property('using').to.eql(true);
            (res.body[0]).should.have.property('creator').to.eql('hk');
        })

        it('게임 데이터를 읽을 수 없어야 한다.', async () => {
            let res = await chai.request(server)
                .get(`/api/v1/tests/${dummyTestId}/data/${dummyTestDataId}`)

            res.should.have.status(404);
        })
    })

    describe('게임 데이터 수정', () => {
        let exampleTestId: string = 'exampleTestId001';
        let exampleTestId2: string = 'exampleTestId002';
        let testTestDataId: string;

        let dummyTestId: string = 'dummytestid001';
        let dummyTestDataId: string = 'dummytestdataid001';

        let testData = new Test({
            'testId': exampleTestId,
            'data': {
                'ID': 'id1',
                'pw': 'pw1',
                'using': true
            },
            'creator': 'hk'
        });

        let testData2 = new Test({
            'testId': exampleTestId2,
            'data': {
                'ID': 'id2',
                'pw': 'pw2',
                'using': false
            },
            'creator': 'hk'
        });

        let dummyTestDta = {
            'creator': 'hk'
        }

        beforeEach(async () => {
            await testData.save((err, testData) => {
                testTestDataId = testData._id
            });
        })

        afterEach(async () => {
            await Test.deleteMany({}, (err) => {
            })
        })

        it('게임 데이터를 수정할 수 있어야 한다.', async () => {
            let res = await chai.request(server)
                .patch(`/api/v1/tests/${exampleTestId}/data/${testTestDataId}`)
                .send(testData2)

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('_id', 'createdDate');
            res.body.should.have.property('testId').to.eql(exampleTestId2);
            res.body.should.have.property('data').have.nested.property('ID').to.eql('id2');
            res.body.should.have.property('data').have.nested.property('pw').to.eql('pw2');
            res.body.should.have.property('data').have.nested.property('using').to.eql(false);
            res.body.should.have.property('creator').to.eql('hk');
        })

        it('게임 데이터를 수정할 수 없어야 한다.(수정 대상 데이터가 존재하지 않는 경우)', async () => {
            let res = await chai.request(server)
                .patch(`/api/v1/tests/${dummyTestId}/data/${dummyTestDataId}`)
                .send(testData2)

            res.should.have.status(404);
        })

        it('게임 데이터를 수정할 수 없어야 한다.(data 필드가 존재하지 않는 경우)', async () => {
            let res = await chai.request(server)
                .patch(`/api/v1/tests/${exampleTestId}/data/${testTestDataId}`)
                .send(dummyTestDta)

            res.should.have.status(405);
        })
    })

    describe('게임 데이터 삭제', () => {

        let exampleTestId: string = 'exampleTestId001';
        let testTestDataId: string;
        let dummyTestId: string = 'dummytestid001';
        let dummyTestDataId: string = 'dummytestdataid001';

        let testData = new Test({
            'testId': exampleTestId,
            'data': {
                'ID': 'id1',
                'pw': 'pw1',
                'using': true
            },
            'creator': 'hk'
        });

        before(async () => {
            await testData.save((err, testData) => {
                testTestDataId = testData._id
            });
        })

        after(async () => {
            await Test.deleteMany({}, (err) => {
            })
        })

        it('게임 데이터를 삭제할 수 있어야 한다.', async () => {
            let res1 = await chai.request(server)
                .delete(`/api/v1/tests/${exampleTestId}/data/${testTestDataId}`)

            res1.should.have.status(200);
            
            let res2 = await chai.request(server)
                .get(`/api/v1/tests/${exampleTestId}/data/${exampleTestId}`)

            res2.should.have.status(404);
        })

        it('게임 데이터를 삭제할 수 없어야 한다.', async () => {
            let res = await chai.request(server)
                .delete(`/api/v1/tests/${dummyTestId}/data/${dummyTestDataId}`)

            res.should.have.status(404);
        })

    })

})
