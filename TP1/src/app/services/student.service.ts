import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
  providedIn:'root'
})

export class StudentService {

  private students = [
    {
      id:0,
      name:'Rayane',
      status:'Présent'
    },
    {
      id:1,
      name:'Thierry',
      status:'Absent'
    },
    {
      id:2,
      name:'Henry',
      status:'Présent'
    }
  ];

  studentsSubject = new Subject<any[]>();

  emitStudentSubject() {
    this.studentsSubject.next(this.students.slice());
  }

  addStudent(name: string, status: string) {
    const studentObject = {
      id: 0,
      name: '',
      status: ''
    };
    studentObject.name = name;
    studentObject.status = status;
    studentObject.id = this.students[(this.students.length - 1)].id + 1;
    this.students.push(studentObject);
    this.emitStudentSubject();
  }

  getStudentById(id:Number){
    const student = this.students.find(
      (s) => {
        return s.id === id;
      }
    );
    return student;
  }

  switchOnAll() {
    for(let student of this.students) {
    student.status = 'Présent';
    }
    this.emitStudentSubject();
  }

  switchOffAll() {
    for(let student of this.students) {
    student.status = 'Absent';
    }
    this.emitStudentSubject();
  }

  switchOnOne(i: number) {
    this.students[i].status = 'Présent';
    this.emitStudentSubject();
  }

  switchOffOne(i: number) {
    this.students[i].status = 'Absent';
    this.emitStudentSubject();
  }

}
