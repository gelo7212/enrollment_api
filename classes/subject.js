import { Subject_Model } from '../models/subject.js';
import { Database } from '../classes/databse.js';
class Subject extends Database {
    constructor(idsubjects, name, code, unit) {
        super();
        this.idsubjects = idsubjects
        this.name = name
        this.code = code
        this.unit = unit
    }
    add() {
        let table = Subject_Model.table;
        return this.create(table, this);
    }
    change(data = Subject_Model) {
        let table = Subject_Model.table;
        let query = this.update(table, this);
        let keys = Object.keys(data).map((key) => key);
        console.log(keys)
        keys.forEach((v, i) => {
            if (i == 0)
                query.where(v, data[v].operator, data[v].value)
            else
                query.andWhere(v, data[v].operator, data[v].value)
        })
        return query;
    }
    deleteByID() {
        let table = Subject_Model.table;
        return this.database().from(table).delete().where(Subject_Model.idsubjects, 'LIKE', this.idsubjects)
    }
    viewBy(data = {
        idsubjects: String,
        name: String,
        code: String,
        unit: String,
    }) {
        let table = Subject_Model.table;
        Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
        let query = this.database().select('*').from(table)
        let keys = Object.keys(this).map((key) => key);
        keys.forEach((v, i) => {
            if (i == 0)
                query.where(v, data[v], this[v])
            else
                query.andWhere(v, data[v], this[v])
        })
        return query;
    }
}


export {
    Subject
}   