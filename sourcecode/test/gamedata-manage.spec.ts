import * as chai from 'chai'
import chaiHttp from 'chai-http';
import { connectMongoose, disconnectMongoose } from './helper/server';
import { Game } from '../src/models/gamedata';
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
            await Game.deleteMany({}, (err) => {
            })
        })

        let exampleGameId: string = 'exampleGameId001';

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
                .post(`/api/v1/games/${exampleGameId}/data`)
                .send(data)

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('gameId', '_id', 'createdDate');
            res.body.should.have.property('data').have.nested.property('ID').to.eql('id1');
            res.body.should.have.property('data').have.nested.property('pw').to.eql('pw1');
            res.body.should.have.property('data').have.nested.property('using').to.eql(true);
            res.body.should.have.property('creator').to.eql('hk');
        })

        it('게임 데이터를 생성할 수 없어야 한다.', async () => {

            let dummyGameData = {
                'creator': 'hk'
            }

            let res = await chai.request(server)
                .post(`/api/v1/games/${exampleGameId}/data`)
                .send(dummyGameData)

            res.should.have.status(405);
        })
    })

    describe('게임 데이터 조회', () => {

        let exampleGameId: string = 'exampleGameId001';
        let testGameDataId: string;
        let dummyGameId: string = 'dummygameid001';
        let dummyGameDataId: string = 'dummygamedataid001';

        before(async () => {
            let gameData = new Game({
                'gameId': exampleGameId,
                'data': {
                    'ID': 'id1',
                    'pw': 'pw1',
                    'using': true
                },
                'creator': 'hk'
            });

            await gameData.save((err, gameData) => {
                testGameDataId = gameData._id
            });
        })

        after(async () => {
            await Game.deleteMany({}, (err) => {
            })
        })

        it('게임 데이터를 읽을 수 있어야 한다.(단일 데이터 조회 기능 테스트)', async () => {
            let res = await chai.request(server)
                .get(`/api/v1/games/${exampleGameId}/data/${testGameDataId}`)

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('_id', 'createdDate');
            res.body.should.have.property('gameId').to.eql(exampleGameId);
            res.body.should.have.property('data').have.nested.property('ID').to.eql('id1');
            res.body.should.have.property('data').have.nested.property('pw').to.eql('pw1');
            res.body.should.have.property('data').have.nested.property('using').to.eql(true);
            res.body.should.have.property('creator').to.eql('hk');
        })

        it('게임 데이터를 읽을 수 있어야 한다.(복수 데이터 조회 기능 테스트)', async () => {
            let res = await chai.request(server)
                .get(`/api/v1/games/${exampleGameId}/data`)

            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.should.have.length(1);
            (res.body[0]).should.have.all.keys('_id', 'createdDate');
            (res.body[0]).should.have.property('gameId').to.eql(exampleGameId);
            (res.body[0]).should.have.property('data').have.nested.property('ID').to.eql('id1');
            (res.body[0]).should.have.property('data').have.nested.property('pw').to.eql('pw1');
            (res.body[0]).should.have.property('data').have.nested.property('using').to.eql(true);
            (res.body[0]).should.have.property('creator').to.eql('hk');
        })

        it('게임 데이터를 읽을 수 없어야 한다.', async () => {
            let res = await chai.request(server)
                .get(`/api/v1/games/${dummyGameId}/data/${dummyGameDataId}`)

            res.should.have.status(404);
        })
    })

    describe('게임 데이터 수정', () => {
        let exampleGameId: string = 'exampleGameId001';
        let exampleGameId2: string = 'exampleGameId002';
        let testGameDataId: string;

        let dummyGameId: string = 'dummygameid001';
        let dummyGameDataId: string = 'dummygamedataid001';

        let gameData = new Game({
            'gameId': exampleGameId,
            'data': {
                'ID': 'id1',
                'pw': 'pw1',
                'using': true
            },
            'creator': 'hk'
        });

        let gameData2 = new Game({
            'gameId': exampleGameId2,
            'data': {
                'ID': 'id2',
                'pw': 'pw2',
                'using': false
            },
            'creator': 'hk'
        });

        let dummyGameDta = {
            'creator': 'hk'
        }

        beforeEach(async () => {
            await gameData.save((err, gameData) => {
                testGameDataId = gameData._id
            });
        })

        afterEach(async () => {
            await Game.deleteMany({}, (err) => {
            })
        })

        it('게임 데이터를 수정할 수 있어야 한다.', async () => {
            let res = await chai.request(server)
                .patch(`/api/v1/games/${exampleGameId}/data/${testGameDataId}`)
                .send(gameData2)

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.all.keys('_id', 'createdDate');
            res.body.should.have.property('gameId').to.eql(exampleGameId2);
            res.body.should.have.property('data').have.nested.property('ID').to.eql('id2');
            res.body.should.have.property('data').have.nested.property('pw').to.eql('pw2');
            res.body.should.have.property('data').have.nested.property('using').to.eql(false);
            res.body.should.have.property('creator').to.eql('hk');
        })

        it('게임 데이터를 수정할 수 없어야 한다.(수정 대상 데이터가 존재하지 않는 경우)', async () => {
            let res = await chai.request(server)
                .patch(`/api/v1/games/${dummyGameId}/data/${dummyGameDataId}`)
                .send(gameData2)

            res.should.have.status(404);
        })

        it('게임 데이터를 수정할 수 없어야 한다.(data 필드가 존재하지 않는 경우)', async () => {
            let res = await chai.request(server)
                .patch(`/api/v1/games/${exampleGameId}/data/${testGameDataId}`)
                .send(dummyGameDta)

            res.should.have.status(405);
        })
    })

    describe('게임 데이터 삭제', () => {

        let exampleGameId: string = 'exampleGameId001';
        let testGameDataId: string;
        let dummyGameId: string = 'dummygameid001';
        let dummyGameDataId: string = 'dummygamedataid001';

        let gameData = new Game({
            'gameId': exampleGameId,
            'data': {
                'ID': 'id1',
                'pw': 'pw1',
                'using': true
            },
            'creator': 'hk'
        });

        before(async () => {
            await gameData.save((err, gameData) => {
                testGameDataId = gameData._id
            });
        })

        after(async () => {
            await Game.deleteMany({}, (err) => {
            })
        })

        it('게임 데이터를 삭제할 수 있어야 한다.', async () => {
            let res1 = await chai.request(server)
                .delete(`/api/v1/games/${exampleGameId}/data/${testGameDataId}`)

            res1.should.have.status(200);
            
            let res2 = await chai.request(server)
                .get(`/api/v1/games/${exampleGameId}/data/${exampleGameId}`)

            res2.should.have.status(404);
        })

        it('게임 데이터를 삭제할 수 없어야 한다.', async () => {
            let res = await chai.request(server)
                .delete(`/api/v1/games/${dummyGameId}/data/${dummyGameDataId}`)

            res.should.have.status(404);
        })

    })

})
