import express from 'express';
import { Section_Subject } from '../classes/section_subject.js';
import { Subject } from '../classes/subject.js';
import { Section_Subject_Model } from '../models/section_subject.js';
import { Subject_Model } from '../models/subject.js'

var router = express.Router();

router.route('/')
    .get(function (req, res, next) {
        let idsubjects = req.query.idsubjects;
        let name = req.query.name;
        let code = req.query.code;
        let unit = req.query.unit;

        let subject = new Subject(idsubjects, name, code, unit);
        subject.viewBy({
            idsubjects: "LIKE",
            name: "LIKE",
            code: "LIKE",
            unit: "LIKE"
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
        let unit = req.body.unit;

        let subject = new Subject(undefined, name, code, unit)
        subject.add().then(result => {
            res.sendStatus(200)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })
router.route('/:id')
    .get(function (req, res, next) {
        let id = req.params.id;
        let subject = new Subject(id, undefined, undefined, undefined);
        subject.viewBy({
            idsubjects: "LIKE"
        }).then(results => {
            res.json(results[0])
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })
    .delete(function (req, res, next) {
        let id = req.params.id;
        let subject = new Subject(id, undefined, undefined, undefined);
        console.log(subject)
        subject.deleteByID().then(result => {
            res.sendStatus(200)
        }).catch(err => {
            res.sendStatus(500)
        })
    })
    .put(function (req, res, next) {
        let id = req.params.id;
        let name = req.body.name;
        let code = req.body.code;
        let unit = req.body.unit;
        let subject = new Subject(undefined, name, code, unit)
        subject.change({
            idsubjects: {
                value: id,
                operator: 'LIKE'
            }
        }).then(result => {
            res.sendStatus(200)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })
router.route("/q/section")
    .get(function (req, res, next) {
        let sectionID = req.query.sectionID;
        let idsection_subject = req.query.idsection_subject
        let start = req.query.start
        let end = req.query.end
        let day = req.query.day
        let course_id = req.query.course_id
        let subject_id = req.query.subject_id
        let prof_id = req.query.prof_id
        let section_subject = new Section_Subject(idsection_subject, start, end, day, course_id, subject_id, sectionID, prof_id)
        section_subject.viewBy({
            course_id: "LIKE",
            start: "LIKE",
            end: "LIKE",
            day: "LIKE",
            idsection_subject: "LIKE",
            prof_id: "LIKE",
            section_id: "LIKE",
            subject_id: "LIKE"
        }).then(results => {
            res.json(results)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })
router.route("/section/:sectionID")
    .get(function (req, res, next) {
        let sectionID = req.params.sectionID;
        let section_subject = new Section_Subject(undefined, undefined, undefined, undefined, undefined, undefined, sectionID, undefined)
        section_subject.viewBy({
            section_id: "LIKE"
        }).then(results => {
            res.json(results)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })
    .post(function (req, res, next) {
        let sectionID = req.params.sectionID
        let subject_id = req.body.subject_id;
        let start = req.body.start
        let end = req.body.end
        let day = req.body.day
        let course_id = req.body.course_id
        // let section_id = req.body.section_id
        let prof_id = req.body.prof_id

        let section_subject = new Section_Subject(undefined, start, end, day, course_id, subject_id, sectionID, prof_id)
        section_subject.add()
            .then(result => {
                res.sendStatus(200)
            }).catch(err => {
                console.log(err)
                res.sendStatus(500)
            })
    })
export default router