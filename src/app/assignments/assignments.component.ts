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
import { Router, RouterLink } from '@angular/router';

import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';

import { SubmittedDirective } from '../shared/submitted.directive';
import { NotSubmittedDirective } from '../shared/notSubmitted.directive';
import { Assignment } from './assignments.model';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../shared/assignments.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-assignments',
  imports: [
    CommonModule, FormsModule,
    //Angular Material
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatDatepickerModule, MatNativeDateModule, MatDivider, MatListModule,
    RouterLink,
    //My part
    AssignmentDetailComponent, SubmittedDirective, NotSubmittedDirective,
    AddAssignmentComponent
],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})

export class AssignmentsComponent implements OnInit{
  titre = "This is my assignments application !"
  formVisible = false;
  selectedAssignment!:Assignment;
  assignments: Assignment[] = [];

  constructor(private assignmentsService: AssignmentsService) {}

  assignmentName = "";
  assignmentDueDate!:Date;
  addActive = false;
  transmittedAssignment: any;//

  ngOnInit(): void{
    console.log("ngOnInit called during component initialization");
    this.getAssignments();
  }

  onSubmit(event:any) {
    console.log(event);
    const newAssignment = new Assignment();
    newAssignment.name = this.assignmentName;
    newAssignment.dueDate = this.assignmentDueDate;
    newAssignment.submitted = false;

    this.assignments.push(newAssignment)
  }

  getAssignments(){
    this.assignmentsService.getAssignments().subscribe(assignments => this.assignments = assignments);
  }

  assignmentClique(assignment:Assignment) {
    this.selectedAssignment = assignment;
  }

  onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }


  addAssignment(newAssignment: Assignment){
    console.log("Nouvel assignment reçu : ", newAssignment);
    this.assignments.push(newAssignment);
    this.formVisible = false;
  }

  updateAssignment(assignment: Assignment) {
    return of("Assignment service: Assignment updated");
  }

}