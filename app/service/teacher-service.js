'use strict'

var modle = require('../model/teacher-model')
var emailParser = require('../utils/email-parser')

module.exports = {

// 0. SHOW LIST OF teachers, for test purpose
getAllTeachers: (req) => {
	return modle.getAllTeachers(req)
},

// 1. register teacher and students
register: (req, teacher, students) => {
	return modle.register(req, teacher, students)
},

// 2. show common students
getCommonStudents: (req, teachers) => {
	return new Promise((resolve, reject) => {
		modle.getStudents(req, teachers).then((data) => { 
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
	return modle.suspendStudent(req, student)
},

// 4. notification list
getNotificationList: (req, teacher, notification) => {
	// get emails from registration in DB 
	return new Promise((resolve, reject) => {
		modle.getStudents(req, teacher)
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
