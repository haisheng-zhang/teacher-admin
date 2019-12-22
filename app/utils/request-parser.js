'use strict'

const GeneralError = require('./general-error')

module.exports = {

post: (req, res, field) => {
    const value = req.body[field]
    console.log(field, value)
    return validate(res, field, value)
},

get: (req, res, field) => {
    const value = req.query[field]
    console.log(field, value)
    return validate(res, field, value)
},

}

function validate(res, field, value) {
    if (!value) {
        throw new GeneralError(400, `[Input] Invalid input data: ${field}`)
    }
    if (Array.isArray(value) && value.length === 0){
        throw new GeneralError(400, `[Input] Invalid input data: ${field}`)
    }
    return value
}
