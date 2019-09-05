import * as chai from 'chai'
import chaiHttp from 'chai-http';
import { connectMongoose, disconnectMongoose } from './helper/server';
import { Game } from '../src/models/gamedata';
import server = require('../src/server');

chai.use(chaiHttp);
let should = chai.should();

describe('4. 사용자는 특정 게임에 의존성을 갖는 데이터를 페이지 단위로 조회할 수 있어야 한다.', () => {

    before(async () => {
        await connectMongoose();
    })

    after(async () => {
        await disconnectMongoose();
    })

    describe('복수 게임 데이터 조회', () => {

        let exampleGameId: string = 'exampleGameId001';

        before(async () => {
            for (let i = 0; i < 10; i++) {

                let gameData = new Game({
                    'gameId': exampleGameId,
                    'data': {
                        'ID': 'id' + i,
                        'pw': 'pw' + i,
                        'using': true
                    },
                    'creator': 'hk'
                });
                
                await gameData.save((err) => {
                });
            }
        })

        after(async () => {
            await Game.deleteMany({}, (err) => {
            })
        })

        it('게임 데이터를 읽을 수 있어야 한다.', async () => {
            let res1 = await chai.request(server)
                .get(`/api/v1/games/${exampleGameId}/data`)
            res1.should.have.status(200);
            res1.body.should.be.a('array');
            res1.body.should.have.length(1);
            (res1.body[0]).should.have.all.keys('_id', 'createdDate');
            (res1.body[0]).should.have.property('gameId').to.eql(exampleGameId);
            (res1.body[0]).should.have.property('data').have.nested.property('ID').to.eql('id1');
            (res1.body[0]).should.have.property('data').have.nested.property('pw').to.eql('pw1');
            (res1.body[0]).should.have.property('data').have.nested.property('using').to.eql(true);
            (res1.body[0]).should.have.property('creator').to.eql('hk');

            let res2 = await chai.request(server)
                .get(`/api/v1/games/${exampleGameId}/data`)
                .query({page: 1, limit: 5})
            res2.body.should.have.length(5);
            (res2.body[0]).should.have.property('data').have.nested.property('ID').to.eql('id0');
            (res2.body[1]).should.have.property('data').have.nested.property('ID').to.eql('id1');
            (res2.body[2]).should.have.property('data').have.nested.property('ID').to.eql('id2');
            (res2.body[3]).should.have.property('data').have.nested.property('ID').to.eql('id3');
            (res2.body[4]).should.have.property('data').have.nested.property('ID').to.eql('id4');

            let res3 = await chai.request(server)
                .get(`/api/v1/games/${exampleGameId}/data`)
                .query({page: 2, limit: 7})
            res3.body.should.have.length(3);
            (res3.body[0]).should.have.property('data').have.nested.property('ID').to.eql('id7');
            (res3.body[1]).should.have.property('data').have.nested.property('ID').to.eql('id8');
            (res3.body[2]).should.have.property('data').have.nested.property('ID').to.eql('id9');

            let res4 = await chai.request(server)
                .get(`/api/v1/games/${exampleGameId}/data`)
                .query({page: 2, limit: 10})
            res4.body.should.have.length(0);
            (res4.body[0]).should.have.property('data').have.nested.property('ID').to.eql('id9');
        })
    })
})