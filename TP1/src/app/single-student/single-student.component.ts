import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'sd-single-student',
  templateUrl: './single-student.component.html',
  styleUrls: ['./single-student.component.scss']
})
export class SingleStudentComponent {
  name?:string = 'etudiant';
  status?:string = 'status';

  constructor(private studentService:StudentService, private route:ActivatedRoute, private router:Router){ }


  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if(!isNaN(+id)){
      this.name = this.studentService.getStudentById(+id)?.name;
      this.status = this.studentService.getStudentById(+id)?.status;
      if(this.name == null){
        this.router.navigate(["not-found"])
      }
    }
    else{
      this.router.navigate(["not-found"])
    }
  }

}
