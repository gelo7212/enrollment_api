import express from 'express';
import { Account } from '../classes/account.js';
import { encrypt, decrypt } from '../functions/jwt.js';
var tempaccount = {
    userid: undefined,
    password: undefined
}
var router = express.Router();
router.route('/')
    .post(function (req, res, next) {
        let userid = req.body.userid;
        let password = req.body.password;

        let account = new Account(userid, password);
        let isSuccess = account.compare(tempaccount);
        if (isSuccess) {
            let t = tempaccount;
            delete t['salt'];
            console.log(t)
            encrypt(t, '9h').then(token => {
                res.cookie('_tokn_', token, { path: '/', expires: new Date(Date.now() + 60000 * 60 * 106), httpOnly: false, secure: false })
                res.sendStatus(200)
            }).catch(err=>{
                res.sendStatus(500)
            })
        } else {
            res.sendStatus(403)
        }
        console.log(account)
    })
    .get(function (req, res, next) {

    })
router.route('/random-account')
    .get(function (req, res, next) {
        let userid = Math.random().toString(36).slice(-8);;
        let password = Math.random().toString(36).slice(-8);
        let account = new Account(userid, password)
        tempaccount = account.create();
        console.log(tempaccount)
        res.json(account)
    })
export default router;