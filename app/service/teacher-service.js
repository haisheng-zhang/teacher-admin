'use strict'

var model = require('../model/teacher-model')
var emailParser = require('../utils/email-parser')

module.exports = {

// 1. register teacher and students
register: (req, teacher, students) => {
	// @todo: I don't do email format check for either teacher or students, to confirm with PO.
	// If I'd do that, emailParser.isValidEmail will be exposed and used to do the validation.
	return model.register(req, teacher, students)
},

// 2. show common students
getCommonStudents: (req, teachers) => {
	return new Promise((resolve, reject) => {
		model.getStudents(req, teachers).then((data) => { 
			var students = []
			for (var i = 0; i < data.length; i++) {
				students.push(data[i].email)
			}
			var uniqStudents = Array.from(new Set(students).values())
			console.log(`data consolidated: ${uniqStudents}`)
			resolve(uniqStudents)
		})
		.catch((error) => { reject(error) })
	})
},

// 3. suspend a student
suspendStudent: (req, student) => {
	return model.suspendStudent(req, student)
},

// 4. notification list
getNotificationList: (req, teacher, notification) => {
	// get emails from registration in DB 
	return new Promise((resolve, reject) => {
		model.getStudents(req, teacher)
			.then((data) => { 
				// get emails from notification
				var students = emailParser.findEmails(notification)

				for (var i = 0; i < data.length; i++) {
					students.push(data[i].email)
				}

				// remove duplication
				var uniqStudents = Array.from(new Set(students).values())
				console.log(`data consolidated: ${uniqStudents}`)
				resolve(uniqStudents)
			})
			.catch((error) => { reject(error) })
	})
	// @todo: do we save notification message to DB? Not for now.
},
}
