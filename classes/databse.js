import { database } from '../functions/db_helper.js';
class Database {
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
    add(table, data) {
        return this.create(table, data);
    }
    delete(table, data, object) {
        Object.keys(object).forEach(key => object[key] === undefined && delete object[key]);
        let keys = Object.keys(object).map((key) => key);
        let query = this.database().from(table).delete();
        keys.forEach((v, i) => {
            if (i == 0)
                query.where(v, data[v], object[v])
            else
                query.andWhere(v, data[v], object[v])
        })
        return query;
    }
    change(table, data, object) {
        let query = this.update(table, object);
        let keys = Object.keys(data).map((key) => key);
        console.log(keys)
        keys.forEach((v, i) => {
            if (i == 0)
                query.where(v, data[v].operator, data[v].value)
            else
                query.andWhere(v, data[v].operator, data[v].value)
        })
        console.log(query.toSQL().sql)
        return query;
    }
    viewBy(table, data, object) {
        Object.keys(object).forEach(key => object[key] === undefined && delete object[key]);
        let query = this.database().select('*').from(table)
        let keys = Object.keys(object).map((key) => key);
        keys.forEach((v, i) => {
            if (i == 0)
                query.where(v, data[v], object[v])
            else
                query.andWhere(v, data[v], object[v])
        })
        return query;
    }
    viewByview(table, data) {
        let query = this.database().select('*').from(table)
        let keys = Object.keys(data).map((key) => key);
        keys.forEach((v, i) => {
            if (i == 0)
                query.where(v, data[v].operator, data[v].value)
            else
                query.andWhere(v, data[v].operator, data[v].value)
        })
        return query;
    }
    database() {
        return database
    }
}

export { Database }