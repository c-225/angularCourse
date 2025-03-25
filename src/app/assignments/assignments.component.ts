import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDivider } from '@angular/material/divider';
import { MatListModule} from '@angular/material/list';

import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';

import { SubmittedDirective } from '../shared/submitted.directive';
import { NotSubmittedDirective } from '../shared/notSubmitted.directive';
import { Assignment } from './assignments.model';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../shared/assignments.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  imports: [
    CommonModule, FormsModule,
    //Angular Material
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatDatepickerModule, MatNativeDateModule, MatDivider, MatListModule, RouterLink,
    //My part
    SubmittedDirective, NotSubmittedDirective
],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})

export class AssignmentsComponent implements OnInit{
  
  assignmentName = "";
  assignmentDueDate!:Date;
  addActive = false;
  selectedAssignment!:Assignment;
  transmittedAssignment: any;
  formVisible = false;
  assignments!: Assignment[];

  constructor(
    private assignmentService: AssignmentsService,
    private router: Router){}

  ngOnInit(): void{
    this.getAssignments();
  }

  onSubmit(event:any) {
    console.log(event);
    const newAssignment = new Assignment();
    newAssignment.name = this.assignmentName;
    newAssignment.dueDate = this.assignmentDueDate;
    newAssignment.submitted = false;

    this.assignments.push(newAssignment)
    this.transmittedAssignment = this.assignments[0]
  }

  clickedAssignment(assignment:Assignment) {
    this.selectedAssignment = assignment;
  }
  onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }

  getAssignments(){
    this.assignmentService.getAssignments().subscribe(assignments => this.assignments = assignments);
  }
  /*
  onNewAssignment(event:Assignment){
    this.assignmentService.addAssignment(event).subscribe(message => console.log(message))
    this.formVisible = false;
  }
  */

}