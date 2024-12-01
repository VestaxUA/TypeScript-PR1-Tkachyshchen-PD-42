"use strict";
// Енум для статусу студента
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic_Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled"; // Відрахований
})(StudentStatus || (StudentStatus = {}));
// Енум для типу курсу
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special"; // Спеціальний
})(CourseType || (CourseType = {}));
// Енум для семестру
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second"; // Другий
})(Semester || (Semester = {}));
// Енум для оцінок
var GradeValue;
(function (GradeValue) {
    GradeValue[GradeValue["Excellent"] = 5] = "Excellent";
    GradeValue[GradeValue["Good"] = 4] = "Good";
    GradeValue[GradeValue["Satisfactory"] = 3] = "Satisfactory";
    GradeValue[GradeValue["Unsatisfactory"] = 2] = "Unsatisfactory"; // Незадовільно
})(GradeValue || (GradeValue = {}));
// Енум для факультетів
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "Computer_Science";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Engineering"] = "Engineering"; // Інженерія
})(Faculty || (Faculty = {}));
// Клас для управління університетом
class UniversityManagementSystem {
    students = []; // Список студентів
    courses = []; // Список курсів
    grades = []; // Список оцінок
    studentCounter = 1; // Лічильник ідентифікаторів студентів
    // Реєстрація нового студента
    enrollStudent(student) {
        const newStudent = { id: this.studentCounter++, ...student };
        this.students.push(newStudent);
        return newStudent;
    }
    // Реєстрація студента на курс
    registerForCourse(studentId, courseId) {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        if (!student)
            throw new Error("Студента не знайдено.");
        if (!course)
            throw new Error("Курс не знайдено.");
        if (student.faculty !== course.faculty)
            throw new Error("Невідповідність факультету.");
        if (this.grades.filter(g => g.courseId === courseId).length >= course.maxStudents) {
            throw new Error("Досягнута максимальна кількість студентів.");
        }
    }
    // Виставлення оцінки студенту
    setGrade(studentId, courseId, grade) {
        const student = this.students.find(s => s.id === studentId);
        if (!student)
            throw new Error("Студента не знайдено.");
        const isRegistered = this.grades.some(g => g.studentId === studentId && g.courseId === courseId);
        if (!isRegistered)
            throw new Error("Студент не зареєстрований на цей курс.");
        this.grades.push({
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: this.courses.find(c => c.id === courseId).semester
        });
    }
    // Зміна статусу студента
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find(s => s.id === studentId);
        if (!student)
            throw new Error("Студента не знайдено.");
        if (newStatus === StudentStatus.Expelled && student.status === StudentStatus.Graduated) {
            throw new Error("Не можна відрахувати випускника.");
        }
        student.status = newStatus;
    }
    // Отримання списку студентів за факультетом
    getStudentsByFaculty(faculty) {
        return this.students.filter(s => s.faculty === faculty);
    }
    // Отримання оцінок студента
    getStudentGrades(studentId) {
        return this.grades.filter(g => g.studentId === studentId);
    }
    // Отримання доступних курсів за факультетом і семестром
    getAvailableCourses(faculty, semester) {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }
    // Розрахунок середньої оцінки студента
    calculateAverageGrade(studentId) {
        const studentGrades = this.getStudentGrades(studentId);
        if (studentGrades.length === 0)
            return 0;
        const total = studentGrades.reduce((sum, g) => sum + g.grade, 0);
        return total / studentGrades.length;
    }
    // Отримання списку відмінників за факультетом
    getTopStudents(faculty) {
        return this.students.filter(student => {
            const avgGrade = this.calculateAverageGrade(student.id);
            return student.faculty === faculty && avgGrade >= GradeValue.Excellent;
        });
    }
}
