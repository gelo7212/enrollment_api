import { database } from '../functions/db_helper.js';
class Database  {
    constructor() {
    }
    create(table, object) {
        let data = Object.keys(object).map((key) => object[key]);
        Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);
        return database(table).insert(object);
    }
    update(table, object) {
        let data = Object.setPrototypeOf(object, Object.prototype);
        Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);
        return database(table).update(data)
    }
    database() {
        return database
    }
}

export { Database }