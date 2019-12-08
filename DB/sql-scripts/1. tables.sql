
CREATE DATABASE IF NOT EXISTS teacherdb;
USE teacherdb;

-- teacher
CREATE TABLE teacher (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    email CHAR(64) NOT NULL,
    PRIMARY KEY (id)
);
CREATE INDEX teacher_index ON teacher(email);

-- student
CREATE TABLE student (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    email CHAR(64) NOT NULL,
    status CHAR(10) NOT NULL DEFAULT 'normal',
    PRIMARY KEY (id)
);
CREATE INDEX student_index ON student(email);

-- registration
CREATE TABLE registration (
    teacher_id MEDIUMINT NOT NULL,
    student_id MEDIUMINT NOT NULL,
    PRIMARY KEY (teacher_id,student_id)
);
CREATE INDEX registration_index ON registration(teacher_id, student_id);

--  notification
CREATE TABLE notification (
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    teacher_id MEDIUMINT NOT NULL,
    notification VARCHAR(256) NOT NULL,
    PRIMARY KEY (id)
);
CREATE INDEX notification_index ON notification(teacher_id);

-- @todo: add index
