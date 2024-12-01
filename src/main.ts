// Енум для статусу студента
enum StudentStatus {
    Active = "Active", // Активний
    Academic_Leave = "Academic_Leave", // Академічна відпустка
    Graduated = "Graduated", // Випускник
    Expelled = "Expelled" // Відрахований
}

// Енум для типу курсу
enum CourseType {
    Mandatory = "Mandatory", // Обов'язковий
    Optional = "Optional", // Вибірковий
    Special = "Special" // Спеціальний
}

// Енум для семестру
enum Semester {
    First = "First", // Перший
    Second = "Second" // Другий
}

// Енум для оцінок
enum GradeValue {
    Excellent = 5, // Відмінно
    Good = 4, // Добре
    Satisfactory = 3, // Задовільно
    Unsatisfactory = 2 // Незадовільно
}

// Енум для факультетів
enum Faculty {
    Computer_Science = "Computer_Science", // Комп'ютерні науки
    Economics = "Economics", // Економіка
    Law = "Law", // Право
    Engineering = "Engineering" // Інженерія
}

// Інтерфейс для студента
interface Student {
    id: number; // Ідентифікатор студента
    fullName: string; // Повне ім'я
    faculty: Faculty; // Факультет
    year: number; // Рік навчання
    status: StudentStatus; // Статус студента
    enrollmentDate: Date; // Дата вступу
    groupNumber: string; // Номер групи
}

// Інтерфейс для курсу
interface Course {
    id: number; // Ідентифікатор курсу
    name: string; // Назва курсу
    type: CourseType; // Тип курсу
    credits: number; // Кількість кредитів
    semester: Semester; // Семестр
    faculty: Faculty; // Факультет
    maxStudents: number; // Максимальна кількість студентів
}

// Інтерфейс для оцінки
interface Grade {
    studentId: number; // Ідентифікатор студента
    courseId: number; // Ідентифікатор курсу
    grade: GradeValue; // Оцінка
    date: Date; // Дата виставлення оцінки
    semester: Semester; // Семестр
}

// Клас для управління університетом
class UniversityManagementSystem {
    private students: Student[] = []; // Список студентів
    private courses: Course[] = []; // Список курсів
    private grades: Grade[] = []; // Список оцінок
    private studentCounter: number = 1; // Лічильник ідентифікаторів студентів

    // Реєстрація нового студента
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { id: this.studentCounter++, ...student };
        this.students.push(newStudent);
        return newStudent;
    }

    // Реєстрація студента на курс
    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student) throw new Error("Студента не знайдено.");
        if (!course) throw new Error("Курс не знайдено.");
        if (student.faculty !== course.faculty) throw new Error("Невідповідність факультету.");
        if (this.grades.filter(g => g.courseId === courseId).length >= course.maxStudents) {
            throw new Error("Досягнута максимальна кількість студентів.");
        }
    }

    // Виставлення оцінки студенту
    setGrade(studentId: number, courseId: number, grade: GradeValue): void {
        const student = this.students.find(s => s.id === studentId);
        if (!student) throw new Error("Студента не знайдено.");

        const isRegistered = this.grades.some(g => g.studentId === studentId && g.courseId === courseId);
        if (!isRegistered) throw new Error("Студент не зареєстрований на цей курс.");

        this.grades.push({
            studentId,
            courseId,
            grade,
            date: new Date(),
            semester: this.courses.find(c => c.id === courseId)!.semester
        });
    }

    // Зміна статусу студента
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);
        if (!student) throw new Error("Студента не знайдено.");

        if (newStatus === StudentStatus.Expelled && student.status === StudentStatus.Graduated) {
            throw new Error("Не можна відрахувати випускника.");
        }

        student.status = newStatus;
    }

    // Отримання списку студентів за факультетом
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    // Отримання оцінок студента
    getStudentGrades(studentId: number): Grade[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    // Отримання доступних курсів за факультетом і семестром
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    // Розрахунок середньої оцінки студента
    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.getStudentGrades(studentId);
        if (studentGrades.length === 0) return 0;

        const total = studentGrades.reduce((sum, g) => sum + g.grade, 0);
        return total / studentGrades.length;
    }

    // Отримання списку відмінників за факультетом
    getTopStudents(faculty: Faculty): Student[] {
        return this.students.filter(student => {
            const avgGrade = this.calculateAverageGrade(student.id);
            return student.faculty === faculty && avgGrade >= GradeValue.Excellent;
        });
    }
}
