const Student_Model = {
    idstudent: function () {
        return 'idstudent'
    }(),
    Name: function () {
        return 'Name'
    }(),
    age: function () {
        return 'age'
    }(),
    address: function () {
        return 'address'
    },
    table: function () {
        return 'student'
    }()
}

const Student_Subject_Model = {
    idstudent_subject: function () {
        return 'idstudent_subject'
    }(),
    student_id: function () {
        return 'student_id'
    }(),
    section_subject_id: function () {
        return 'section_subject_id'
    }(),
    table: function () {
        return 'student_subject'
    }(),
    student_subject_view: function () {
        return 'student_subject_view';
    }()
}
const Student_Details_Model = {
    idstudent_section: function () {
        return 'idstudent_section'
    }(),
    student_id: function () {
        return 'student_id'
    }(),
    section_id: function () {
        return 'section_id'
    }(),
    date_started: function () {
        return 'date_started'
    }(),
    section_student_view: function () {
        return 'section_student_view';
    }(),
    table: function () {
        return 'student_details';
    }()
}

export { Student_Model, Student_Subject_Model, Student_Details_Model }