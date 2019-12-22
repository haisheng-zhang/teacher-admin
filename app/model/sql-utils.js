'use strict'

const GeneralError = require('../utils/general-error')
const mysql = require('mysql')

module.exports = {

// Note: sql injection is solved in such two ways:
// 1. in my own sql sentance,  mysql.escape(string) is called before any sql call;
// 2. in a placeholder (put ? in query(sql)), the escape is handled automatically.

// register teacher
registerTeacher: (teacher) => {

    validString(teacher)
    const teacherEsc = mysql.escape(teacher)

    const sql = `
        insert ignore into teacher(email) 
        values (${teacherEsc})
        `
    console.log(`register teacher sql: ${sql}`)
    return sql
},

// register students
registerStudents: (students) => {

    validArray(students)
    const studentsEsc = escapeArray(students)

    // NOTE: if some of the students have been in system, then we'll insert all of the non-existing students,
    //          no error will produce (like `Duplicate entry '4-1' for key 'PRIMARY'`)
    // same as teacher and relation table
    const studentsUpdateStr = `(${studentsEsc.join('),(')})`
    const sql = `
        insert ignore into student(email) 
        values ${studentsUpdateStr}
        `
    console.log(`register students sql: ${sql}`)
    return sql
},

// register teacher with students
register: (teacher, students) => {

    validString(teacher)
    validArray(students)
    const teacherEsc = mysql.escape(teacher)
    const studentsEsc = escapeArray(students)

    const studentsQueryStr = `${studentsEsc.join(',')}`
    const sql = `
        replace into registration(teacher_id, student_id)
        select 
            (select id from teacher where email = ${teacherEsc} limit 1) teacher_id,
            id as student_id
        from student
        where email in (${studentsQueryStr})
        `
    console.log(`register sql: ${sql}`)
    return sql
},

// filter students by teachers' email, through registration relationship
getStudents: (teachers) => {
    // final sql string to query (looks like performance is not very good):
    /*
        select email from ( 
            select t0.student_id from (
                select r.student_id from registration r join teacher t on (r.teacher_id=t.id)  where t.email = 'teacherken@gmail.com'
            )  t0  
            join
            (
                select r.student_id from registration r join teacher t on (r.teacher_id=t.id)  where t.email = 'teacherjame@gmail.com'
            )  t1 
            on (t0.student_id = t1.student_id)) t
        join student s
        on (s.id = t.student_id)
        where s.status != 'suspend'
    */

    validArray(teachers)
    const teachersEsc = escapeArray(teachers)

    const sqlStart = `select email from (`
    const sqlEnd = `) t
        join student s
        on (s.id = t.student_id)
        where s.status != 'suspend'`
    var sqlQuery = ''
    if (teachersEsc.length > 0){
        sqlQuery = 
        ` select t0.student_id from (
            select r.student_id from registration r join teacher t on (r.teacher_id=t.id)  where t.email = ${teachersEsc[0]}
        )  t0 `
    }
    for (var i = 1; i < teachersEsc.length; i++) {
        sqlQuery += ` join
        (
            select r.student_id from registration r join teacher t on (r.teacher_id=t.id)  where t.email = ${teachersEsc[i]}
        )  t${i} `
    }

    var onConditionStart = ''
    var onConditionEnd = ''
    var onConditionQuery = ''
    if (teachersEsc.length > 1) {
        onConditionStart = 'on ('
        onConditionQuery += `t0.student_id = t1.student_id`
        onConditionEnd = ')'
    }
    for (var i = 2; i < teachersEsc.length; i++) {
        onConditionQuery += ` and t0.student_id = t${i}.student_id`
    }

    const sql = sqlStart + sqlQuery + onConditionStart + onConditionQuery + onConditionEnd + sqlEnd
    
    console.log(`getStudents by teacher sql: ${sql}`)
    return sql
},

// suspend student by email
suspendStudent: (student) => {
    validString(student)
    
    const studentEsc = mysql.escape(student)
    return `update student set status = \'suspend\' where email = ${studentEsc}`
},

// get non-suspend students
getNonSuspendStudents: (students) => {    
    validArray(students)
    const studentsEsc = escapeArray(students)

    const studentStr = `${studentsEsc.join(',')}`
    const sql = `
        select email 
        from student 
        where status != 'suspend' and email in (${studentStr})
        `
    console.log(`getNonSuspendStudents sql: ${sql}`)
    return sql
},
}

function validString(str){
    if (!str) {
        throw new GeneralError(400, `[Input] Invalid input data`)
    }
}

function validArray(array){
    if (!array || array.length == 0) {
        throw new GeneralError(400, `[Input] Invalid input data`)
    }
}

function escapeArray(array){
    const arrayEsc = []
    for (var i = 0; i < array.length; i++){
        arrayEsc.push(mysql.escape(array[i]))
    }
    return arrayEsc
}
