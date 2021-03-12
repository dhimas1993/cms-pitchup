const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

describe('API ENDPOINT TESTING', () => {
    it('GET Landing Page', (done) => {
        chai.request(app).get('/api/v1/dashboard/category').end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            done();
        })
    })
})
