import { database } from '../functions/db_helper.js';
import { Student_Details_Model, Student_Model } from '../models/student.js';
import { Student_Subject_Model } from '../models/student.js';
import { Database } from '../classes/databse.js';
class Student extends Database {
    constructor(idstudent, Name, age, address) {
        super()
        this.idstudent = idstudent
        this.Name = Name
        this.age = age
        this.address = address
    }
    add() {
        let table = Student_Model.table;
        return super.add(table, this)
    }
    delete(data = Student_Model) {
        let table = Student_Model.table;
        return super.delete(table, data, this)
    }
    change(data = Student_Model) {
        let table = Student_Model.table;
        return super.change(table, data, this)
    }
    viewBy(data = {
        idstudent: String,
        Name: String,
        age: String,
        address: String,
    }) {
        let table = Student_Model.table;
        let query = super.viewBy(table, data, this);
        return query.returning(Student_Model.idstudent);
    }
}

class Student_Subject extends Database {
    constructor(idstudent_subject, student_id, section_subject_id) {
        super();
        this.idstudent_subject = idstudent_subject;
        this.student_id = student_id;
        this.section_subject_id = section_subject_id;
    }
    add() {
        let table = Student_Subject_Model.table;
        return super.add(table, this)
    }
    delete(data = Student_Subject_Model) {
        let table = Student_Subject_Model.table;
        return super.delete(table, data, this)
    }
    change(data = Student_Subject_Model) {
        let table = Student_Subject_Model.table;
        return super.change(table, data, this)
    }
    viewBy(data = Student_Details_Model, table) {
        let query = super.viewBy(table, data, this);
        return query;
    }
    viewByview(data = Student_Subject_Model, table) {
        let query = super.viewByview(table, data);
        return query;
    }
}


class Student_Details extends Database {
    constructor(idstudent_section, student_id, section_id, date_started) {
        super();
        this.idstudent_section = idstudent_section
        this.student_id = student_id
        this.section_id = section_id
        this.date_started = date_started
    }
    add() {
        let table = Student_Details_Model.table;
        return super.add(table, this)
    }
    delete(data = Student_Details_Model) {
        let table = Student_Details_Model.table;
        return super.delete(table, data, this)
    }
    change(data = Student_Details_Model) {
        let table = Student_Details_Model.table;
        return super.change(table, data, this)
    }
    viewBy(data = Student_Details_Model, table) {
        let query = super.viewBy(table, data, this);
        return query;
    }
}

export {
    Student,
    Student_Subject,
    Student_Details
}   