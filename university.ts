class Student {
  constructor(private id: string,private name: string,private faculty: string) {}

  getStudentInfo(): string {
    return `นักศึกษา ${this.id} ชื่อ ${this.name} คณะ ${this.faculty}`;
  }
}

class Teacher {
  constructor(
    private name: string,
    private major: string
  ) {}

  getTeacherInfo(): string {
    return `ชื่ออาจารย์ ${this.name} สาขาวิชา ${this.major}`;
  }

  
  teach(student: Student): void {
    console.log(`${this.getTeacherInfo()} สอน ${student.getStudentInfo()}`);
  }
}

class University {
  students: Student[];
  teachers: Teacher[];

  constructor(students: Student[], teachers: Teacher[]) {
    this.students = students;
    this.teachers = teachers;
  }

  showUniversityInfo(): void {
    console.log("University Information:");

    console.log("\nStudents:");
    this.students.forEach((s) => {
      console.log(s.getStudentInfo());
    });

    console.log("\nTeachers:");
    this.teachers.forEach((t) => {
      console.log(t.getTeacherInfo());
    });
  }
}

const student1 = new Student("684245003", "ธีรเทพ", "Science");
const student2 = new Student("684245002", "ปติพง", "Science");
const student3 = new Student("684245001", "อภิชาติ", "Education");
const teacher1 = new Teacher("สรพงษ์", "Science");
const teacher2 = new Teacher("ธรรมรัตน์", "Science");
const npru = new University([student1, student2, student3], [teacher1, teacher2]);
npru.showUniversityInfo();
console.log("------------------");
teacher1.teach(student1);
teacher2.teach(student2);
teacher2.teach(student3);