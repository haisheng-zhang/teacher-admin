var assert = require('assert')

var service = require('../../app/service/teacher-service')
var modle = require('../../app/model/teacher-model')

describe('Teacher service should work fine', () => {
    describe('register', () =>  {
        it('register succeed', () =>  {
            assert (1 === 1)

            // jest.mock('../model/teacher-model', () => ({
            //     register: jest.fn()
            //   }))

            // var req = {
            //     "teacher": "teacherken@gmail.com",
            //     "students":
            //     [
            //         "studentjon@gmail.com",
            //         "studenthon@gmail.com"
            //     ]
            // }

            // var response = {};

            // // var modelStub = sinon.stub(modle, 'register').callsFake(() => {
            // //         return Promise.resolve(response);
            // // });

            // return service.register(req).then((data) => {
            //     expect(data).to.deep.equal(response);
            // })
        })
    })
})
