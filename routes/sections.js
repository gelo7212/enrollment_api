import express from 'express';
import { Professor_Model } from '../models/professor.js';
import { Course_Model } from '../models/course.js';
import { Section } from '../classes/section.js';
import { database } from '../functions/db_helper.js';
import { Section_Model } from '../models/section.js';

var router = express.Router();

router.route('/')
    .get(function (req, res, next) {
        let idsection = req.query.idsection;
        let name = req.query.name;
        let code = req.query.code;
        let adviser_id = req.query.adviser_id;
        let course_id = req.query.course_id;

        let section = new Section(idsection, name, code, adviser_id, course_id);
        let q = section.viewBy({
            idsection: "LIKE",
            name: "LIKE",
            code: "LIKE",
            adviser_id: "LIKE",
            course_id: "LIKE"
        })
        let alias = {};
        alias["name"] = "s." + Section_Model.name;
        alias["code"] = "s." + Section_Model.code;
        alias["adviser"] = "p." + Professor_Model.name;
        alias["course"] = "c." + Course_Model.name
        let query = database.select(alias).from({ s: q })
            .leftJoin({ p: Professor_Model.table }, "p." + Professor_Model.idproffessors, "s." + Section_Model.adviser_id)
            .leftJoin({ c: Course_Model.table }, "c." + Course_Model.idcourse, "s." + Section_Model.course_id)
        query.then(results => {
            console.log(query.toSQL().sql)
            res.json(results)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })
    .post(function (req, res, next) {
        let name = req.body.name;
        let code = req.body.code;
        let adviser_id = req.body.adviser_id;
        let course_id = req.body.course_id;
        let section = new Section(undefined, name, code, adviser_id, course_id)
        section.add()
            .then(result => {
                res.sendStatus(200)
            }).catch(err => {
                console.log(err)
                res.sendStatus(500)
            })
    })
router.route("/:id")
    .get(function (req, res, next) {
        let idsection = req.params.id;
        let section = new Section(idsection, undefined, undefined, undefined, undefined);
        let q = section.viewBy({
            idsection: "LIKE"
        })
        let alias = {};
        alias["name"] = "s." + Section_Model.name;
        alias["code"] = "s." + Section_Model.code;
        alias["adviser"] = "p." + Professor_Model.name;
        alias["course"] = "c." + Course_Model.name
        let query = database.select(alias).from({ s: q })
            .leftJoin({ p: Professor_Model.table }, "p." + Professor_Model.idproffessors, "s." + Section_Model.adviser_id)
            .leftJoin({ c: Course_Model.table }, "c." + Course_Model.idcourse, "s." + Section_Model.course_id)
        query.then(results => {
            console.log(query.toSQL().sql)
            res.json(results[0])
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })
    .put(function (req, res, next) {
        let idsection = req.params.id;
        let name = req.body.name;
        let code = req.body.code;
        let adviser_id = req.body.adviser_id;
        let course_id = req.body.course_id;
        let section = new Section(undefined, name, code, adviser_id, course_id)
        section.change({
            idsection: {
                value: idsection,
                operator: "LIKE"
            }
        }).then(result => {
            res.sendStatus(200)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })
    .delete(function (req, res, next) {
        let id = req.params.id;
        let section = new Section(id, undefined, undefined, undefined, undefined)
        section.deleteByID()
            .then(result => {
                res.sendStatus(200)
            }).catch(err => {
                console.log(err)
                res.sendStatus(500)
            })
    })

export default router;