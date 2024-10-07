// Визначення типів для днів тижня, часових слотів, типів курсів, професорів, класів, курсів, занять та конфліктів
type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

type Professor = {
    id: number;
    name: string;
    department: string;
};

type Classroom = {
    number: string;
    capacity: number;
    hasProjector: boolean;
};

type Course = {
    id: number;
    name: string;
    type: CourseType;
};

type Lesson = {
    id: number;
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: DayOfWeek;
    timeSlot: TimeSlot;
};

type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};

// Приклад даних для професорів, класів та курсів
const professors: Professor[] = [
  { id: 1, name: "Олег Іванов", department: "Фізика" },
  { id: 2, name: "Марія Петрова", department: "Математика" },
  { id: 3, name: "Сергій Коваленко", department: "Інформатика" },
];

const classrooms: Classroom[] = [
  { number: "101", capacity: 30, hasProjector: true },
  { number: "102", capacity: 25, hasProjector: false },
  { number: "103", capacity: 40, hasProjector: true },
  { number: "104", capacity: 50, hasProjector: true },
  { number: "105", capacity: 20, hasProjector: false },
];

const courses: Course[] = [
  { id: 1, name: "Фізика", type: "Lecture" },
  { id: 2, name: "Алгебра", type: "Lecture" },
  { id: 3, name: "Програмування", type: "Lab" },
  { id: 4, name: "Дослідження операцій", type: "Seminar" },
  { id: 5, name: "Математичний аналіз", type: "Practice" },
];

// Розклад занять
const schedule: Lesson[] = [
  { id: 1, courseId: 1, professorId: 1, classroomNumber: "101", dayOfWeek: "Monday", timeSlot: "8:30-10:00" },
  { id: 2, courseId: 2, professorId: 2, classroomNumber: "102", dayOfWeek: "Tuesday", timeSlot: "10:15-11:45" },
  { id: 3, courseId: 3, professorId: 3, classroomNumber: "103", dayOfWeek: "Wednesday", timeSlot: "12:15-13:45" },
  { id: 4, courseId: 4, professorId: 1, classroomNumber: "104", dayOfWeek: "Thursday", timeSlot: "14:00-15:30" },
  { id: 5, courseId: 5, professorId: 2, classroomNumber: "105", dayOfWeek: "Friday", timeSlot: "15:45-17:15" },
];

// Функція для заповнення таблиці розкладу у HTML
function fillScheduleTable() {
  const tableBody = document.querySelector("#scheduleTable tbody") as HTMLTableSectionElement | null;

  if (!tableBody) {
      console.error("Тіло таблиці не знайдено!");
      return;
  }

  tableBody.innerHTML = ''; // Очищення попередніх даних

  // Додавання рядків для кожного заняття в розкладі
  schedule.forEach(lesson => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${lesson.id}</td> <!-- Додано відображення id -->
          <td>${lesson.courseId}</td>
          <td>${lesson.professorId}</td>
          <td>${lesson.classroomNumber}</td>
          <td>${lesson.dayOfWeek}</td>
          <td>${lesson.timeSlot}</td>
      `;
      tableBody.appendChild(row);
  });
}
fillScheduleTable(); // Виклик функції для заповнення таблиці

// Функція для додавання професора
function addProfessor(professor: Professor): void {
  professors.push(professor);
  console.log("Professor added:", professor);
}

// Функція для перевірки конфліктів занять
function validateLesson(lesson: Lesson): boolean {
  const conflictExists = schedule.some(existingLesson => 
      existingLesson.id !== lesson.id &&  // Перевірка на різні заняття
      existingLesson.dayOfWeek === lesson.dayOfWeek &&  // Порівняння днів
      existingLesson.timeSlot === lesson.timeSlot &&  // Порівняння часових слотів
      existingLesson.classroomNumber === lesson.classroomNumber  // Порівняння аудиторій
  );

  if (conflictExists) {
      console.warn(`Конфлікт для заняття з ID ${lesson.id} у ${lesson.dayOfWeek} з часом ${lesson.timeSlot} в аудиторії ${lesson.classroomNumber}.`);
  }
  return conflictExists; // Повертає true, якщо конфлікт є
}

// Функція для додавання заняття
function addLesson(lesson: Lesson): boolean {
  const conflict = validateLesson(lesson); // Перевірка конфлікту
  if (conflict) {
      console.log("Conflict found:", conflict);
      return false; // Якщо конфлікт, повертає false
  }
  schedule.push(lesson); // Додавання заняття до розкладу
  console.log("Lesson added:", lesson);
  fillScheduleTable(); // Оновлення таблиці
  return true;
}

// Функція для знаходження вільних аудиторій за часовим слотом та днем тижня
function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
  // Фільтруємо заняття, що проходять в даний час та день
  const bookedClassrooms = schedule
      .filter(lesson => lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot)
      .map(lesson => lesson.classroomNumber);
  // Повертаємо список вільних аудиторій
  return classrooms
      .filter(classroom => !bookedClassrooms.includes(classroom.number))
      .map(classroom => classroom.number);
}

// Функція для отримання розкладу певного професора
function getProfessorSchedule(professorId: number): Lesson[] {
  return schedule.filter(lesson => lesson.professorId === professorId); // Фільтруємо за ID професора
}

// Функція для розрахунку використання аудиторії
function getClassroomUtilization(classroomNumber: string): number {
  const totalLessons = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length; // Кількість занять в аудиторії
  const utilization = (totalLessons / (5 * 5)) * 100; // Розрахунок відсотка використання (припускаємо 5 днів на тиждень та 5 слотів)
  return utilization;
}

// Функція для отримання найпопулярнішого типу курсу
function getMostPopularCourseType(): CourseType {
  const typeCount: Record<CourseType, number> = {
      Lecture: 0,
      Seminar: 0,
      Lab: 0,
      Practice: 0,
  };

  // Підрахунок типів курсів у розкладі
  schedule.forEach(lesson => {
      const course = courses.find(c => c.id === lesson.courseId);
      if (course) {
          typeCount[course.type]++;
      }
  });

  // Повертає тип курсу з найбільшим числом
  return Object.keys(typeCount).reduce((a, b) => typeCount[a as CourseType] > typeCount[b as CourseType] ? a : b) as CourseType;
}

// Функція для зміни аудиторії заняття
function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
  const lessonIndex = schedule.findIndex(lesson => lesson.id === lessonId); // Знаходження індексу заняття за ID
  if (lessonIndex === -1) {
    console.error(`Заняття з ID ${lessonId} не знайдено.`);
    return false; // Якщо заняття не знайдено, повертає false
  }

  // Створення нової копії заняття з новою аудиторією
  const updatedLesson = { ...schedule[lessonIndex], classroomNumber: newClassroomNumber };
  const conflict = validateLesson(updatedLesson); // Перевірка конфлікту з новою аудиторією

  if (conflict) {
    console.warn(`Не вдалося змінити аудиторію для заняття з ID ${lessonId}. Конфлікт в аудиторії ${newClassroomNumber}.`);
    return false; // Якщо конфлікт, повертає false
  }

  // Оновлення розкладу
  schedule[lessonIndex] = updatedLesson;
  fillScheduleTable(); // Оновлення таблиці
  console.log(`Аудиторію для заняття з ID ${lessonId} змінено на ${newClassroomNumber}.`);
  return true;
}

// Додавання нового професора
addProfessor({ id: 4, name: "Ірина Сидоренко", department: "Фізика" });

// Додавання нового заняття
addLesson({ id: 6, courseId: 1, professorId: 1, classroomNumber: "105", dayOfWeek: "Monday", timeSlot: "10:15-11:45" });

// Пошук доступних аудиторій
const availableClassrooms = findAvailableClassrooms("10:15-11:45", "Monday");
console.log("Вільні аудиторії в понеділок о 10:15:", availableClassrooms);

// Отримання розкладу професора
const professorSchedule = getProfessorSchedule(1);
console.log("Розклад професора з ID 1:", professorSchedule);

// Отримання використання аудиторії
const utilization = getClassroomUtilization("101");
console.log("Використання аудиторії 101:", utilization, "%");

// Отримання найпопулярнішого типу курсу
const mostPopularCourseType = getMostPopularCourseType();
console.log("Найпопулярніший тип курсу:", mostPopularCourseType);

// Зміна аудиторії заняття
const reassignmentSuccess = reassignClassroom(1, "103");
if (reassignmentSuccess) {
  console.log("Аудиторію успішно змінено.");
}
