
module.exports = {

get: (req, res, field) => {
	var value = req.sanitize(field).escape().trim()
	if (!value) {
		res.status(400).send(`[Input] Invalid input data: ${field}.`)
		return
	}
	return value
}

}