import { Assignment } from '../assignments.model';
import { AssignmentsService } from '../../shared/assignments.service';

import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../../shared/auth.service';


@Component({
  imports:[MatCardModule, MatCheckboxModule, CommonModule],
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})

export class AssignmentDetailComponent implements OnInit{
  @Input() transmittedAssignment?: Assignment;

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
    if (this.transmittedAssignment === undefined) return; 
      this.assignmentService.updateAssignment(this.transmittedAssignment).subscribe(message => {
        console.log(message);
      });
    this.router.navigate(['/home']);
  }

  onDelete(){
    if (this.transmittedAssignment === undefined) return;
    this.assignmentService.deleteAssignment(this.transmittedAssignment).subscribe(message => {
      console.log(message)});
    this.transmittedAssignment = undefined;
    this.router.navigate(['/home']);
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
    return this.authService.loggedIn;
  }

}
