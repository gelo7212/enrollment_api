import express from 'express';
import { Course } from '../classes/course.js';

var router = express.Router();

router.route('/')
    .get(function (req, res, next) {
        let idcourse = req.query.idcourse;
        let name = req.query.name;
        let code = req.query.code;

        let course = new Course(idcourse, name, code);
        course.viewBy({
            idcourse: "LIKE",
            name: "LIKE",
            code: "LIKE"
        }).then(results => {
            res.json(results)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })
    .post(function (req, res, next) {
        let name = req.body.name;
        let code = req.body.code;

        let course = new Course(undefined, name, code)
        course.add()
            .then(result => {
                res.sendStatus(200)
            }).catch(err => {
                console.log(err)
                res.sendStatus(500)
            })
    })
router.route('/:id')
    .get(function (req, res, next) {
        let idcourse = req.params.id;
        let course = new Course(idcourse, undefined, undefined);
        course.viewBy({
            idcourse: "LIKE"
        }).then(results => {
            res.json(results[0])
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })
    .put(function (req, res, next) {
        let idcourse = req.params.id;
        let name = req.body.name;
        let code = req.body.code;
        let course = new Course(undefined, name, code);
        course.change({
            idcourse: {
                value: idcourse,
                operator: "LIKE"
            }
        }).then(result => {
            res.sendStatus(200)
        }).catch(err => {
            res.sendStatus(500)
        })
    })
    .delete(function (req, res, next) {
        let id = req.params.id;
        let course = new Course(id, undefined, undefined);
        course.deleteByID()
            .then(result => {
                res.sendStatus(200)
            }).catch(err => {
                res.sendStatus(500)
            })
    })

export default router;