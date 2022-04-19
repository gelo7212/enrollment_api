import express from 'express';
import { Student, Student_Subject, Student_Details } from '../classes/Student.js';
import { Student_Model } from '../models/student.js'

var router = express.Router();

router.route('/')
  .get(function (req, res, next) {
    let id = req.query.id;
    let name = req.query.name;
    let age = req.query.age;
    let address = req.query.address;
    let student = new Student(id, name, age, address)
    student.viewBy({
      idstudent: "LIKE",
      Name: "LIKE",
      age: "LIKE",
      address: "LIKE",
    }).then(result => {
      res.send(result)
    })
  })
  .post(function (req, res, next) {
    let name = req.body.name;
    let age = req.body.age;
    let address = req.body.address;
    let section_id = req.body.section_id;
    let date_started = req.body.date_started;
    let student = new Student(undefined, name, age, address);
    student.add().then(result => {
      let student_details = new Student_Details(undefined, result[0], section_id, date_started)
      student_details.add()
        .then(result => {
          res.send(student)
        }).catch(err => {
          console.log(err)
          res.sendStatus(500)
        })
    }).catch(err => {
      res.send(err).statusCode(500)
    })

  })
router.route('/:id')
  .get(function (req, res, next) {
    let id = req.params.id;
    let student = new Student(id, undefined, undefined, undefined);
    student.viewBy({ idstudent: 'LIKE' }).then(result => {
      res.json(result[0])
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  })
  .delete(function (req, res, next) {
    let id = req.params.id;
    let student = new Student(id, undefined, undefined, undefined)
    student.delete({ idstudent: "LIKE" }).then(result => {
      res.send(200)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  })
  .put(function (req, res, next) {
    let id = req.params.id;
    let name = req.body.name;
    let age = req.body.age;
    let address = req.body.address;

    let student = new Student(undefined, name, age, address)
    student.change({
      idstudent: {
        value: id,
        operator: "LIKE"
      }
    }).then(result => {
      res.sendStatus(200)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  })

router.route('/:student_id/q/subject/:section_subject_id')
  .post(function (req, res, next) {
    let id = req.params.section_subject_id;
    let stud = req.params.student_id;
    let student_subject = new Student_Subject(undefined, stud, id);
    student_subject.add()
      .then(result => {
        res.sendStatus(200)
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(500)
      })
  })
router.route('/q/student-subject/:section_subject_id')
  .get(function (req, res, next) {
    let id = req.params.section_subject_id;
    let student_subject = new Student_Subject(id, undefined, undefined);
    student_subject.viewBy({
      idstudent_subject: "LIKE"
    }).then(results => {
      res.json(results)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  })
  .delete(function (req, res, next) {
    let id = req.params.section_subject_id;
    let student_subject = new Student_Subject(id, undefined, undefined);
    student_subject.delete({
      idstudent_subject: "LIKE"
    }).then(result => {
      res.sendStatus(200)
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
  })
router.route('/section/:sectionid')
  .get(function (req, res, next) {
    let id = req.params.sectionid;
  })
export default router;