
import { Database } from '../classes/databse.js';
import { Course_Model } from '../models/course.js';
class Course extends Database {
    constructor(idcourse, name, code) {
        super();
        this.idcourse = idcourse;
        this.name = name;
        this.code = code;
    }
    add() {
        let table = Course_Model.table;
        return this.create(table, this);
    }
    change(data = Course_Model) {
        let table = Course_Model.table;
        let query = this.update(table, this);
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
    deleteByID() {
        let table = Course_Model.table;
        return this.database().from(table).delete().where(Course_Model.idcourse, 'LIKE', this.idcourse)
    }
    viewBy(data = {
        idcourse: String,
        name: String,
        code: String
    }) {
        let table = Course_Model.table;
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

export { Course }