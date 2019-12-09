'use strict'

var express = require('express')
var app = express()

var service = require('../service/teacher-service')
var errorHandler = require('../utils/error-handler')
var reqParser = require('../utils/request-parser')

// 1. register teacher and students
app.post('/register', (req, res, next) => {    
    errorHandler.handleRequest(req, res)
    var teacher = reqParser.post(req, res, 'teacher')
    var students = reqParser.post(req, res, 'students')
    console.log(`register input data: ${teacher}, [${students.join(', ')}]`)

    service.register(req, teacher, students)
        .then((data) => { res.status(204).send() })
        .catch((error) => { errorHandler.handleReject(error, req, res) })
})

// 2. show common students
app.get('/commonstudents?:teacher', (req, res, next) => {
    errorHandler.handleRequest(req, res)
    var teachers = reqParser.get(req, res, 'teacher')

    // normalize teacher parameter as array
    teachers = Array.isArray(teachers) ? teachers : [teachers]
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
    var student = reqParser.post(req, res, 'student')
    console.log(`suspendStudent input data:  ${student}`)

    service.suspendStudent(req, student)
        .then((data) => { res.status(204).send() })
        .catch((error) => { errorHandler.handleReject(error, req, res) })
})

// 4. notification list
app.post('/retrievefornotifications', (req, res, next) => {    
    errorHandler.handleRequest(req, res)
    var teacher = reqParser.post(req, res, 'teacher')
    var notification = reqParser.post(req, res, 'notification')
    console.log(`notification input for:  ${teacher}, '${notification}'`)
    
    service.getNotificationList(req, teacher, notification)
        .then((data) => { 
            res.json({
                recipients: data
            })
        })
        .catch((error) => { errorHandler.handleReject(error, req, res) })
})

module.exports = app
