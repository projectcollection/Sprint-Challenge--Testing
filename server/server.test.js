const request = require('supertest')

const app = require('./index')

const db = require('../data/dbconfig')



describe('app', () => {
    beforeEach(async () => db('games').truncate())
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
                .expect(201)
        });

        test('should respond with json', () => {
            return request(app)
                .post('/games')
                .send({
                    title: 'Mario',
                    genre: 'Casual',
                    releaseYear: 1985
                })
                .expect('Content-Type', /json/)
        });
    });

    describe('GET /games', () => {
        test('should respond with 200', () => {
            return request(app)
                .get('/games')
                .expect(200)
        });

        test('should return with array if not records found', () => {
            return request(app)
                .get('/games')
                .expect(200, [])
        });

        test('should return array of games', async () => {
            const appInstance = request(app)

            await appInstance
                .post('/games')
                .send({
                    title: 'Mario',
                    genre: 'Casual',
                    releaseYear: 1985
                })
            await appInstance
                .post('/games')
                .send({
                title: 'DOTA 2',
                genre: 'MOBA',
                releaseYear: 2013
            })

            return appInstance
                .get('/games')
                .expect(200, [ { 
                    id: 1, 
                    title: 'Mario', 
                    genre: 'Casual', 
                    releaseYear: 1985 
                },
                { 
                    id: 2, 
                    title: 'DOTA 2', 
                    genre: 'MOBA', 
                    releaseYear: 2013 
                }])
        })

        test('should return with json', () => {
            return request(app)
                .get('/games')
                .expect('Content-Type', /json/)
        });

    });
})