import request from 'supertest';

const app = 'http://localhost:3001';

describe('AppController (e2e)', () => {
    it('/ (GET)', () => {
        return request(app)
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});
