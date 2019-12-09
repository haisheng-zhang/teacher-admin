'use strict'

module.exports = {

handler: (error, req, res, next) => {
    console.log(`global error, error: ${error.status, error.message}`)
    res.status(error.status).json({ 
        message: error.message
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