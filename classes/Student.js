import { database } from '../functions/db_helper.js';
import { Student_Model } from '../models/student.js';
import { Database } from '../classes/databse.js';
class Student extends Database {
    constructor(idstudent, Name, age, address) {
        super();
        this.idstudent = idstudent
        this.Name = Name
        this.age = age
        this.address = address
    }
    add() {
        let table = Student_Model.table;
        return this.create(table, this);
    }
    deleteByID() {
        let table = Student_Model.table;
        return this.database().from(table).where(Student_Model.idstudent, 'LIKE', this.idstudent)
    }
    change(data = Student_Model) {
        let table = Student_Model.table;
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
    viewBy(data = {
        idstudent: String,
        Name: String,
        age: String,
        address: String,
    }) {
        let table = Student_Model.table;
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
    Student
}   