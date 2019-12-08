'use strict'

var express = require('express')
var app = express()

var service = require('../service/teacher-service')
var errorHandler = require('../utils/error-handler')
var reqParser = require('../utils/request-parser')

// 0. SHOW LIST OF teachers, for test purpose
app.get('/', (req, res, next) => {
	service.getAllTeachers(req)
		.then((data) => { res.json(data)})
		.catch((error) => { errorHandler.handleReject(error, req, res) })
})

// 1. register teacher and students
app.post('/register', (req, res, next) => {	
	errorHandler.handleRequest(req, res)
	var teacher = reqParser.get(req, res, 'teacher')
	var students = reqParser.get(req, res, 'students').split(',')
	console.log(`register input data: ${teacher}, [${students.join(', ')}]`)

    service.register(req, teacher, students)
		.then((data) => { res.status(204).send() })
		.catch((error) => { errorHandler.handleReject(error, req, res) })
})

// 2. show common students
app.get('/commonstudents?:teacher', (req, res, next) => {
	errorHandler.handleRequest(req, res)
	var teachers = reqParser.get(req, res, 'teacher').split(',')
	console.log(`commonStudents input data: ${teachers.join(' ')}`)

	service.getCommonStudents(req, teachers)
		.then((data) => { 
			res.json({
				students: data
			})
		})
		.catch((error) => { errorHandler.handleReject(error, req, res) })
})

// 3. suspend a student
app.post('/suspend', (req, res, next) => {	
	errorHandler.handleRequest(req, res)
	var student = reqParser.get(req, res, 'student')
	console.log(`suspendStudent input data:  ${student}`)

	service.suspendStudent(req, student)
		.then((data) => { res.status(204).send() })
		.catch((error) => { errorHandler.handleReject(error, req, res) })
})

// 4. notification list
app.post('/retrievefornotifications', (req, res, next) => {	
	errorHandler.handleRequest(req, res)
	var teacher = reqParser.get(req, res, 'teacher').split(',')
	var notification = reqParser.get(req, res, 'notification')
	console.log(`notification input for:  ${teacher}, '${notification}'`)
	
	var x = ['teacher', 'notification']
	service.getNotificationList(req, teacher, notification)
		.then((data) => { 
			res.json({
				recipients: data
			})
		})
		.catch((error) => { errorHandler.handleReject(error, req, res) })
})

module.exports = app
