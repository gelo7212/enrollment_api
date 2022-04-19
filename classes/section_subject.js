import { Section_Subject_Model } from '../models/section_subject.js';
import { Database } from '../classes/databse.js';
class Section_Subject extends Database {
    constructor(idsection_subject, start, end, day, course_id, subject_id, section_id, prof_id) {
        super();
        this.idsection_subject = idsection_subject;
        this.start = start;
        this.end = end;
        this.day = day;
        this.course_id = course_id;
        this.subject_id = subject_id;
        this.section_id = section_id;
        this.prof_id = prof_id;
    }
    add() {
        let table = Section_Subject_Model.table;
        return this.create(table, this);
    }
    change(data = Section_Subject_Model) {
        let table = Section_Subject_Model.table;
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
    delete(data = {
        idsection_subject: String,
        start: String,
        end: String,
        day: String,
        course_id: Number,
        subject_id: Number,
        section_id: Number,
        prof_id: Number,
    }) {
        let table = Section_Subject_Model.table;
        Object.keys(this).forEach(key => this[key] === undefined && delete this[key]);
        let keys = Object.keys(this).map((key) => key);
        let query = this.database().from(table).delete();
        keys.forEach((v, i) => {
            if (i == 0)
                query.where(v, data[v], this[v])
            else
                query.andWhere(v, data[v], this[v])
        })
        return query;
    }
    viewBy(data = {
        idsection_subject: String,
        start: String,
        end: String,
        day: String,
        course_id: Number,
        subject_id: Number,
        section_id: Number,
        prof_id: Number,
    }) {
        let table = Section_Subject_Model.table;
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

export { Section_Subject }