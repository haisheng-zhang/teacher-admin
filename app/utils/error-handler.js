'use strict'
var app = require('../routes/teacher-api')
const GeneralError = require('./general-error')

module.exports = {

handler: (error, req, res, next) => {
    console.log(`global error, error: ${error}`)
    if (error instanceof GeneralError) {
        res.status(error.status).json({ 
            message: error.message
        })
    } else {
        res.status(500).json({ 
            message: '[Unknown] Unknown server error.'
        }) 
    }
},

handleException: (error, res) => {
    console.log(`Exception error log: ${error}`)
    res.status(500).json({
        message: `[Unknown] ${error}`
    })
},

handleReject: (error, req, res) => {
    console.log(`reject error log: ${error}`)
    res.status(500).json({
        message: `[DB] ${error}`
    })
},

handleRequest: (req, res) => {
    var errors = req.validationErrors()
    if (errors) {
        res.status(400).json({
            message: '[Input] Invalid input data.'
        })
    }
},

}

process.on('unhandledRejection', function (err, promise) {
    console.log('unhandledRejection:', err, promise);
    console.log('unhandledRejection: no res to fill in so the client request will hang there, ' +
        'but at least the server will not be dead.')
    
})

process.on('uncaughtException', function (err) {
    console.log('uncaughtException:', err);
    console.log('uncaughtException: no res to fill in so the client request will hang there, ' +
        'but at least the server will not be dead.')
})
