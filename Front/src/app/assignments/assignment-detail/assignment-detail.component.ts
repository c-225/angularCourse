import { Assignment } from '../assignments.model';
import { AssignmentsService } from '../../shared/assignments.service';

import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports:[MatCardModule, MatCheckboxModule, CommonModule, MatButtonModule],
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})

export class AssignmentDetailComponent implements OnInit{
  @Input() transmittedAssignment!: Assignment;
  assignment!: Assignment;

  constructor(
    private assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id:number = +this.route.snapshot.params['id'];
    console.log("ngOnInit of assignment-detail", id)

    this.assignmentService.getAssignment(id)
      .subscribe(assignment => {
        this.transmittedAssignment = assignment;
      });
    
      console.log(this.transmittedAssignment)

  }
  
  onSubmittedAssignment(){
    //this.transmittedAssignment.submitted = true;
    this.assignmentService
      .updateAssignment(this.transmittedAssignment)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }

  onDelete(){
    if (this.transmittedAssignment === undefined) return;
    this.assignmentService.deleteAssignment(this.transmittedAssignment).subscribe(message => {
      console.log(message);
      this.router.navigate(['/home']);
      //this.transmittedAssignment = undefined;
    });
  }
  getAssignment(){
    const id = this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id).subscribe(assignment => {
      this.transmittedAssignment = assignment;
    });
  }

  onClickEdit() {
    this.router.navigate(["/assignments", this.transmittedAssignment?.id, "edit"],
    {queryParams:{name:this.transmittedAssignment?.name}, fragment: 'edition'})
  }
  
  isAdmin(){
    return this.authService.currentUser?.role === 'admin';
  }
  isTeacher(){
    return this.authService.currentUser?.role === 'teacher';
  }
  isStudent(){
    return this.authService.currentUser?.role === 'student';
  }

}
