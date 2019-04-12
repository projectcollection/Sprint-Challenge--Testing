const request = require('supertest')

const app = require('./index')

const db = require('../data/dbconfig')

beforeAll(async done => {
    await db.seed.run();
    done();
})

describe('app', () => {
    describe('POST /games', () => {
        test('should respond with 422 if title or genre is missing', () => {
            return request(app)
                .post('/games')
                .send({
                   releaseYear: 2000 
                })
                .expect(422)
        });

        test('should respond with 201 if recieved correct data', () => {
            return request(app)
                .post('/games')
                .send({
                    title: 'Mario',
                    genre: 'Casual',
                    releaseYear: 1985
                })
                .expect(200)
        })

        test('should respond with json', () => {
            return request(app)
                .post('/games')
                .send({
                    title: 'Mario',
                    genre: 'Casual',
                    releaseYear: 1985
                })
                .expect('Content-Type', /json/)
        })
    })
})