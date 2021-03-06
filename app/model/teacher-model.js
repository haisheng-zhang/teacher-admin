'use strict'

var sqlUtils = require('./sql-utils')

module.exports = {

// register teacher with students
register: (req, teacher, students) => {
    // the code is ugly....

    return new Promise((resolve, reject) => {
        req.getConnection((error, conn) => {
            conn.beginTransaction( (err) => {
                // register teacher
                var teacherSql = sqlUtils.registerTeacher(teacher)
                conn.query(teacherSql, (err, rows, fields) => {
                    console.log(`callback: ${err}, ${rows}, ${fields}`)
                    errorRollbackAndReject(conn, reject, resolve, err)

                    // register students
                    var studentsSql = sqlUtils.registerStudents(students)
                    conn.query(studentsSql, (err, rows, fields) => {
                        console.log(`callback: ${err}, ${rows}, ${fields}`)
                        errorRollbackAndReject(conn, reject, resolve, err)

                        // register relation
                        var sql = sqlUtils.register(teacher, students)
                        conn.query(sql, (err, rows, fields) => {
                            console.log(`callback: ${err}, ${rows}, ${fields}`)
                            errorRollbackAndReject(conn, reject, resolve, err)

                            conn.commit((err) =>{
                                errorRollbackAndReject(conn, reject, resolve, err)

                                console.log('Register transaction Complete.');
                                resolve(rows)
                            })
                        })
                    })
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

function errorRollbackAndReject(conn, reject, resolve, err) {
    if (err) { 
        conn.rollback(() => {
            conn.release()
            reject(err.toString())
        })
    }
}