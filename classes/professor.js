import { Professor_Model } from '../models/professor.js';
import { Database } from '../classes/databse.js';
class Professor extends Database {
    constructor(idproffessors, name) {
        super();
        this.idproffessors = idproffessors;
        this.name = name;
    }
    add() {
        let table = Professor_Model.table;
        return this.create(table, this);
    }
    change(data = Professor_Model) {
        let table = Professor_Model.table;
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
        let table = Professor_Model.table;
        return this.database().from(table).delete().where(Professor_Model.idproffessors, 'LIKE', this.idproffessors)
    }
    viewBy(data = {
        idproffessors: String,
        name: String
    }) {
        let table = Professor_Model.table;
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

export { Professor }