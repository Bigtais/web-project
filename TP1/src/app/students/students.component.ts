import { Component, Input } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'sd-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  @Input() studentName!:string;
  @Input() studentStatus!:string;
  @Input() index!:number;
  @Input() id!:number;

  constructor(private studentService: StudentService) { }

  getStatus(){
    return this.studentStatus;
  }

  onSwitch() {
    if(this.studentStatus === 'Présent') {
    this.studentService.switchOffOne(this.index);
    } else if(this.studentStatus === 'Absent') {
    this.studentService.switchOnOne(this.index);
    }
  }


  getColor() {
    if(this.studentStatus === 'Présent') {
    return 'green';
    } else if(this.studentStatus === 'Absent') {
    return 'red';
    }
    return 'black';
  }

}
