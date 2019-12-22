'use strict'

var sqlUtils = require('./sql-utils')

module.exports = {

// register teacher with students
register: (req, teacher, students) => {
    return new Promise((resolve, reject) => {
        req.getConnection((err, conn) => {
            checkConnection(conn, reject, resolve, err)
            conn.beginTransaction( (err) => {
                Promise.all([
                    registerTeacher(conn, teacher),
                    registerStudents(conn, students)
                ]).then(() => {
                    registerRelation(conn, teacher, students)
                }
                ).then(() => {
                    conn.commit((err) =>{
                        errorRollbackAndReject(conn, reject, resolve, err)
                    })
                }).catch((err) => {
                    errorRollbackAndReject(conn, reject, resolve, err)
                })
            })
        })
    })
},

// filter students by teachers' email, through registration relationship
getStudents: (req, teachers) => queryDB(req, sqlUtils.getStudents(teachers)),

// suspend student by email
suspendStudent: (req, student) => queryDB(req, sqlUtils.suspendStudent(student)),

// get students by teachers' email, plus the students mentioned and not suspended
getNotificationStudents: (req, teacher, mentionedStudents) => {
    var sql = sqlUtils.getStudents([teacher])
    if (mentionedStudents.length > 0){
        sql += ' union ' + sqlUtils.getNonSuspendStudents(mentionedStudents)
    }
    return queryDB(req, sql)
},
}

// a generic method to call DB and execute sql query
function queryDB(req, sql){
    return new Promise((resolve, reject) => {
        req.getConnection((err, conn) => {
            checkConnection(conn, reject, resolve, err)
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

function errorRollbackAndReject(conn, reject, resolve, err) {
    if (err) { 
        conn.rollback(() => {
            reject(err.toString())
        })
    } else {
        resolve(1)
    }
}

function checkConnection(conn, reject, resolve, err) {
    if (err) { 
        reject(err.toString())
    }
}

function registerTeacher(conn, teacher) {
    return new Promise(function(resolve, reject) {
        // register teacher
        console.log('before register teacher')
        var teacherSql = sqlUtils.registerTeacher(teacher)
        conn.query(teacherSql, (err, rows, fields) => {
            console.log('after register teacher')
            errorRollbackAndReject(conn, reject, resolve, err)
        })
    })
}

function registerStudents(conn, students) {
    return new Promise(function(resolve, reject) {
        // register students
        console.log('before register students')
        var studentsSql = sqlUtils.registerStudents(students)
        conn.query(studentsSql, (err, rows, fields) => {
            console.log('after register students')
            errorRollbackAndReject(conn, reject, resolve, err)
        })
    })
}

function registerRelation(conn, teacher, students) {
    return new Promise(function(resolve, reject) {
        // register relation
        console.log('before register relation')
        var sql = sqlUtils.register(teacher, students)
        conn.query(sql, (err, rows, fields) => {
            console.log('after register relation')
            errorRollbackAndReject(conn, reject, resolve, err)
        })
    })
}