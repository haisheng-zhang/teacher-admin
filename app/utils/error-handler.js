
module.exports = {

handler: (error, req, res, next) => {
	// Any request to this server will get here, and will send an HTTP
	// response with the error message 'woops'

	console.log('global error!!!', error)
	res.status(500).json({ message: '[Global exception] ' + error })
},

handleReject: (error, req, res) => {
	console.log('reject error log:' + error)
	res.status(500).json({error: 500, msg: '[DB] ' + error})
},

handleRequest: (req, res) => {
	var errors = req.validationErrors()
	if (errors) {
		res.status(400).send('[Input] Invalid input data.')
		return
	}
}

}