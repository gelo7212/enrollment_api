import { Section_Model } from '../models/section.js';
import { Database } from '../classes/databse.js';
class Section extends Database {
    constructor(idsection, name, code, adviser_id, course_id) {
        super();
        this.idsection = idsection;
        this.name = name;
        this.code = code;
        this.adviser_id = adviser_id;
        this.course_id = course_id;
    }
    add() {
        let table = Section_Model.table;
        return this.create(table, this);
    }
    change(data = Section_Model) {
        let table = Section_Model.table;
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
        let table = Section_Model.table;
        return this.database().from(table).delete().where(Section_Model.idsection, 'LIKE', this.idsection)
    }
    viewBy(data = {
        idsection: Number,
        name: String,
        code: String,
        adviser_id: Number,
        course_id: Number
    }) {
        let table = Section_Model.table;
        let query = this.database().select('*').from(table);
        console.log(table)
        Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
        let keys = Object.keys(this).map((key) => key);
        keys.forEach((v, i) => {
            if (i == 0)
                query.where(v, data[v], this[v])
            else
                query.andWhere(v, data[v], this[v])
        })
        console.log(query.toSQL().sql)
        return query;
    }
}

export { Section }