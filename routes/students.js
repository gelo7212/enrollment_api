import express from 'express';
import { Student } from '../classes/Student.js';
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

    let student = new Student(undefined, name, age, address);
    student.add().then(result => {
      res.send(student)
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
    student.deleteByID().then(result => {
      res.send(200)
    }).catch(err => {
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

export default router;