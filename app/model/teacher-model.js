'use strict'

var sqlUtils = require('./sql-utils')

module.exports = {

// register teacher with students
register: (req, teacher, students) => queryDB(req, sqlUtils.register(teacher, students)),

// filter students by teachers' email, through registration relationship
getStudents: (req, teachers) => queryDB(req, sqlUtils.getStudents(teachers)),

// suspend student by email
suspendStudent: (req, student) => queryDB(req, sqlUtils.suspendStudent(student)),

}

// a generic method to call DB and execute sql query
function queryDB(req, sql){
	return new Promise((resolve, reject) => {
		req.getConnection((error, conn) => {
			conn.query(sql, (err, rows, fields) => {
				callback(err, rows, fields, reject, resolve)
			})
		})
	})
}

function callback(err, rows, fields, reject, resolve) {
	console.log(`callback: ${err}, ${rows}, ${fields}`)
	if (err) {
		reject(err.toString())
	} else {
		resolve(rows)
	}
}
