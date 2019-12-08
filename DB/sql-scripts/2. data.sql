-- @todo: add init data in DB for testing
USE teacherdb;

-- teacher (id, email)
INSERT INTO teacher (email) VALUES
('teacherken@gmail.com')
, ('teacherham@gmail.com')
, ('teacherjame@gmail.com')
;

-- student(id, email, status)
INSERT INTO student (email,status) VALUES
('studentjon@gmail.com', 'normal')
, ('studenthon@gmail.com', 'normal')
, ('studentmon@gmail.com', 'normal')
;

-- registration(teacher_id, student_id)
INSERT INTO registration (teacher_id,student_id)
SELECT t.id, s.id
FROM teacher t, student s
WHERE t.email = 'teacherken@gmail.com'
AND s.email = 'studentjon@gmail.com'
;

INSERT INTO registration (teacher_id,student_id)
SELECT t.id, s.id
FROM teacher t, student s
WHERE t.email = 'teacherken@gmail.com'
AND s.email = 'studenthon@gmail.com'
;

INSERT INTO registration (teacher_id,student_id)
SELECT t.id, s.id
FROM teacher t, student s
WHERE t.email = 'teacherham@gmail.com'
AND s.email = 'studentjon@gmail.com'
;

INSERT INTO registration (teacher_id,student_id)
SELECT t.id, s.id
FROM teacher t, student s
WHERE t.email = 'teacherham@gmail.com'
AND s.email = 'studentmon@gmail.com'
;

--  notification(teacher_id, notification)
-- INSERT INTO notification (teacher_id,notification) VALUES
-- ();
