
import {
    createHash,
    createHmac,
    randomBytes
} from 'crypto';
class Account {
    constructor(userid, password) {
        this.userid = userid;
        this.password = password;
    }
    create() {
        let hash = this.hash(undefined, this.password)
        return {
            password: hash.value,
            userid: this.userid,
            salt: hash.salt
        }
    }
    compare(data = {
        password: String,
        userid: String,
        salt: Buffer
    }) {
        let hash = this.hash(data.salt, this.password)
        return hash.value == data.password
    }
    hash(salt = undefined, password) {
        if (typeof salt == 'undefined')
            salt = randomBytes(128).toString('base64');
        var hmac = createHmac('sha256', salt);
        let hashPwd = hmac.update(password).digest('hex');
        return {
            salt,
            value: hashPwd
        }
    }

}

export { Account }