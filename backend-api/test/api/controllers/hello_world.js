const should = require('should')
const request = require('supertest')
const server = require('../../../app')

describe('controllers', () => {
  describe('hello_world', () => {
    describe('GET /hello', () => {
      it('should return a default string', (done) => {
        request(server)
          .get('/hello')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err)

            res.body.should.eql('Hello, stranger!')

            done()
          })
      })

      it('should accept a name parameter', (done) => {
        request(server)
          .get('/hello')
          .query({ name: 'Scott' })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err)

            res.body.should.eql('Hello, Scott!')

            done()
          })
      })
    })
  })
})
