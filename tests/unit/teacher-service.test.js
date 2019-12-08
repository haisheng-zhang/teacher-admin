var service = require("../../app/service/teacher-service");
var model = require("../../app/model/teacher-model");
var emailParser = require("../../app/utils/email-parser");

describe("Teacher service should work fine", () => {
  describe("register", () => {
    it("should exist", () => {
      expect(service.register).toBeTruthy();
    });

    it("should return the unchanged DB model", () => {
      var mockReq = {};
      var mockDBModel = {
        students: [
          "commonstudent1@gmail.com",
          "commonstudent2@gmail.com",
          "student_only_under_teacher_ken@gmail.com"
        ]
      };
      model.register = () => mockDBModel;
      var result = service.register(mockReq);
      expect(result).toEqual(mockDBModel);
    });
  });

  describe("getCommonStudents", () => {
    it("should exist", () => {
      expect(service.getCommonStudents).toBeTruthy();
    });

    it("should return only common students", () => {
      var mockStudentsData = [
        { email: "commonstudent1@gmail.com" },
        { email: "commonstudent1@gmail.com" },
        { email: "commonstudent2@gmail.com" }
      ];
      model.getStudents = () => Promise.resolve(mockStudentsData);
      service.getCommonStudents({}, []).then(result => {
        expect(result).toBeTruthy();
        expect(result.length).toEqual(2);
      });
    });

    it("should return empty array if no students is found", () => {
      model.getStudents = () => Promise.resolve(undefined);
      service.getCommonStudents({}, []).then(result => {
        expect(result).toBeTruthy();
        expect(result.length).toEqual(0);
      });
    });

    it("should return error if error occurs", () => {
      var mockErr = "DB_ERROR";
      model.getStudents = () => Promise.reject(mockErr);
      service
        .getCommonStudents({}, [])
        .then(result => expect(result).toBeUndefined())
        .catch(err => expect(err).toEqual(mockErr));
    });
  });

  describe("suspendStudent", () => {
    it("should exist", () => {
      expect(service.suspendStudent).toBeTruthy();
    });

    it("should return the unchanged DB model", () => {
      var mockReq = {};
      var mockDBModel = {
        students: [
          "commonstudent1@gmail.com",
          "commonstudent2@gmail.com",
          "student_only_under_teacher_ken@gmail.com"
        ]
      };
      model.suspendStudent = () => mockDBModel;
      var result = service.suspendStudent(mockReq);
      expect(result).toEqual(mockDBModel);
    });
  });

  describe("getNotificationList", () => {
    it("should exist", () => {
      expect(service.getNotificationList).toBeTruthy();
    });

    it("should return only common students", () => {
      var mockStudentsData = [
        { email: "commonstudent1@gmail.com" },
        { email: "commonstudent1@gmail.com" },
        { email: "commonstudent2@gmail.com" }
      ];
      var mockEmailsData = [
        "commonstudent1@gmail.com",
        "commonstudent1@gmail.com",
        "commonstudent3@gmail.com"
      ];
      model.getStudents = () => Promise.resolve(mockStudentsData);
      emailParser.findEmails = () => mockEmailsData;
      service.getNotificationList({}, []).then(result => {
        expect(result).toBeTruthy();
        expect(result.length).toEqual(3);
      });
    });

    it("should return empty array if no students is found", () => {
      model.getStudents = () => Promise.resolve(undefined);
      emailParser.findEmails = () => [];
      service.getNotificationList({}, []).then(result => {
        expect(result).toBeTruthy();
        expect(result.length).toEqual(0);
      });
    });

    it("should return error if error occurs", () => {
      var mockErr = "DB_ERROR";
      emailParser.findEmails = () => Promise.reject(mockErr);
      service
        .getNotificationList({}, [])
        .then(result => expect(result).toBeUndefined())
        .catch(err => expect(err).toEqual(mockErr));
    });
  });

  
});