import jwt from 'jsonwebtoken';

const privateKey = "tP7xJSBsMJyq++iCLtvAFF0e668iE06QLyV18mfAEK7sam2tnfLr33EaaDtFk9+gv1/pSUGPmk0LgdJ78mj/sAgzG9m110o98nGSEWnIS6vbygUg2EakCbAJBJJlSfFiJzywiPkgnEQcGEMUQ1nvx4iePTT4Ym5UjEWS2mraau8=";
function encrypt(data, expiresIn, audience = undefined, issuer = undefined) {
    return new Promise((resolve, reject) => {
        let options = { algorithm: 'HS256', expiresIn: expiresIn };
        Object.keys(options).forEach(key => options[key] === undefined && delete options[key]);
        jwt.sign(data, privateKey, options, (err, token) => {
            if (err) return reject(err)
            resolve(token)
        })
    })
}
function decrypt(token) {
    return new Promise((resolve, reject) => {
        let opts = {
            algorithms: ["HS256"]
        }
        try {
            jwt.verify(token, privateKey, opts, (err, decoded) => {
                if (err) return reject(err)
                resolve(decoded)
            })
        } catch (error) {
            return reject(error)
        }
    })
}

function isAuthenticated(req, res, next) {
    let cookie = req.cookies['_tokn_']
    decrypt(cookie).then(result => {
        if (result) {
            res.userData = result
            next();
        } else {
            res.sendStatus(403)
        }
    }).catch(err => {
        console.log(err)
        res.sendStatus(403)
    })
}
export {
    encrypt,
    decrypt,
    isAuthenticated
}