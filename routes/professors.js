import express from 'express';
import { Professor } from '../classes/professor.js';
import { Professor_Model } from '../models/professor.js';


var router = express.Router();

router.route('/')
    .get(function (req, res, next) {
        let id = req.query.id;
        let name = req.query.name;

        let professor = new Professor(id, name)
        professor.viewBy({
            idproffessors: 'LIKE',
            name: 'LIKE'
        }).then(results => {
            console.log(results)
            res.json(results)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })
    .post(function (req, res, next) {
        let name = req.body.name;

        let professor = new Professor(undefined, name);
        professor.add().then(result => {
            res.sendStatus(200)
        }).catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
    })
router.route('/:id')
    .get(function (req, res, next) {
        let id = req.params.id;
        let professor = new Professor(id, undefined);
        professor.viewBy({ idproffessors: 'LIKE' })
            .then(result => {
                res.json(result[0])
            }).catch(err => {
                console.log(err)
                res.sendStatus(500)
            })
    })
    .delete(function (req, res, next) {
        let id = req.params.id;
        let professor = new Professor(id, undefined);
        professor.deleteByID()
            .then(result => {
                res.sendStatus(200)
            }).catch(err => {
                console.log(err);
                res.sendStatus(500)
            })
    })
    .put(function (req, res, next) {
        let id = req.params.id;
        let name = req.body.name;
        let professor = new Professor(undefined, name);
        professor.change({
            idproffessors: {
                value: id,
                operator: 'LIKE'
            }
        })
            .then(result => {
                res.sendStatus(200)
            }).catch(err => {
                console.log(err)
                res.sendStatus(500)
            })
    })

export default router;