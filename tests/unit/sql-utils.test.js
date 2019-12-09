var assert = require('assert')
var utils = require('../../app/model/sql-utils')

describe('Sql utils should work fine', () => {

    describe('register teacher', () =>  {
        it('register teacher succeed', () =>  {
            var expect = beautify(
                `insert ignore into teacher(email) values ('t1@g.com')`
            )

            var sql = beautify(utils.registerTeacher('t1@g.com')).trim()

            console.log(`register teacher sql: ${sql}`)
            assert(expect === sql)
        })

        it('register teacher fails with undefined teacher', () =>  {
            try {
                utils.registerTeacher(undefined)
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('register teacher fails with null teacher', () =>  {
            try {
                utils.registerTeacher(null)
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('register teacher fails with empty teacher', () =>  {
            try {
                utils.registerTeacher('')
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
    })

    describe('register students', () =>  {
        it('register students succeed', () =>  {
            var expect = beautify(
                `insert ignore into student(email) 
                values ('t1@g.com'),('t2@g.com')`
            )

            var sql = beautify(utils.registerStudents(['t1@g.com', 't2@g.com'])).trim()

            console.log(`register students sql: ${sql}`)
            assert(expect === sql)
        })

        it('register students fails with undefined students', () =>  {
            try {
                utils.registerStudents(undefined)
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('register students fails with null students', () =>  {
            try {
                utils.registerStudents(null)
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('register students fails with empty students', () =>  {
            try {
                utils.registerStudents([])
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
    })

    describe('register', () =>  {
        it('register succeed', () =>  {
            var expect = beautify(
                `replace into registration(teacher_id, student_id) 
                select (select id from teacher where email = 't@g.com' limit 1) teacher_id, 
                    id as student_id 
                from student 
                where email in ('s@g.com')`
            )

            var sql = beautify(utils.register('t@g.com', ['s@g.com'])).trim()

            console.log(`register sql: ${sql}`)
            assert(expect === sql)
        })

        it('register fails with undefined teacher', () =>  {
            try {
                utils.register(undefined, ['s@g.com'])
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('register fails with null teacher', () =>  {
            try {
                utils.register(null, ['s@g.com'])
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('register fails with empty teacher', () =>  {
            try {
                utils.register('', ['s@g.com'])
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('register fails with undefined students', () =>  {
            try {
                utils.register('t@g.com', undefined)
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('register fails with null students', () =>  {
            try {
                utils.register('t@g.com', null)
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('register fails with empty students', () =>  {
            try {
                utils.register('t@g.com', [])
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
    })

    describe('get students', () =>  {
        it('get students succeed', () =>  {
            var expect = beautify(
                `select email from ( 
                    select t0.student_id from (
                        select r.student_id from registration r join teacher t on (r.teacher_id=t.id)  where t.email = 't1@g.com'
                        )  t0  
                        join
                        (
                                select r.student_id from registration r join teacher t on (r.teacher_id=t.id)  where t.email = 't2@g.com'
                        )  t1 
                        on (t0.student_id = t1.student_id)) t
                join student s
                on (s.id = t.student_id)
                where s.status != 'suspend'`
            )

            var sql = beautify(utils.getStudents(['t1@g.com', 't2@g.com'])).trim()

            console.log(`get student sql: ${sql}`)
            assert(expect === sql)
        })

        it('get students fails with undefined students', () =>  {
            try {
                utils.getStudents(undefined)
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('get students fails with null students', () =>  {
            try {
                utils.getStudents(null)
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('get students fails with empty students', () =>  {
            try {
                utils.getStudents([])
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
    })

    describe('suspendStudent', () =>  {
        it('suspend student succeed', () =>  {
            var expect = beautify(
                `update student set status = \'suspend\' where email = 't1@g.com'`
            )

            var sql = beautify(utils.suspendStudent('t1@g.com')).trim()

            console.log(`suspend sql: ${sql}`)
            assert(expect === sql)
        })

        it('suspend student fails with undefined teacher', () =>  {
            try {
                utils.suspendStudent(undefined)
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('suspend student fails with null teacher', () =>  {
            try {
                utils.suspendStudent(null)
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('suspend student fails with empty teacher', () =>  {
            try {
                utils.suspendStudent('')
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
    })


    describe('get non-suspend students', () =>  {
        it('get non-suspend students succeed', () =>  {
            var expect = beautify(
                `select email 
                from student 
                where status != 'suspend' and email in ('t1@g.com','t2@g.com')`
            )

            var sql = beautify(utils.getNonSuspendStudents(['t1@g.com', 't2@g.com'])).trim()

            console.log(`register students sql: ${sql}`)
            assert(expect === sql)
        })

        it('get non-suspend students fails with undefined students', () =>  {
            try {
                utils.getNonSuspendStudents(undefined)
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('get non-suspend students fails with null students', () =>  {
            try {
                utils.getNonSuspendStudents(null)
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
        it('get non-suspend students fails with empty students', () =>  {
            try {
                utils.getNonSuspendStudents([])
            } catch (e) {
                expect(e.message).toBe("[Input] Invalid input data");
            }
        })
    })
})

beautify = (sql) => sql.replace(/\s\s+/g, ' ')
