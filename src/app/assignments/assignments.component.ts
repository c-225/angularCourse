import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDivider } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';

import { SubmittedDirective } from '../shared/submitted.directive';
import { NotSubmittedDirective } from '../shared/notSubmitted.directive';
import { Assignment } from './assignments.model';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';

@Component({
  selector: 'app-assignments',
  imports: [
    CommonModule, FormsModule,
    //Angular Material
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatDatepickerModule, MatNativeDateModule, MatDivider, MatListModule,
    //My part
    AssignmentDetailComponent, SubmittedDirective, NotSubmittedDirective,
    AddAssignmentComponent
],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})

export class AssignmentsComponent implements OnInit{
  titre = "This is the list of assignments :"
  // FOR THE FORM INPUT FIELDS
  assignmentName = "";
  assignmentDueDate!:Date;
  addActive = false;
  selectedAssignment!:Assignment;
  transmittedAssignment: any;
  formVisible = false;

  ngOnInit(): void{
    setTimeout(() => {
        this.addActive = true;
    }, 2000);
  }

  onSubmit(event:any) {
    console.log(event);
    const newAssignment = new Assignment();
    newAssignment.name = this.assignmentName;
    newAssignment.dueDate = this.assignmentDueDate;
    newAssignment.submitted = false;

    this.assignments.push(newAssignment)
  }

  assignments = [
    {
      name: "Assignment 1",
      dueDate: new Date("2021-01-01"),
      submitted: true,
    },
    {
      name: "Assignment 2",
      dueDate: new Date("2021-02-01"),
      submitted: true,
    },
    {
      name: "Assignment 3",
      dueDate: new Date("2021-03-01"),
      submitted: false,
    }
  ];

  assignmentClique(assignment:Assignment) {
    this.selectedAssignment = assignment;
  }
  onAddAssignmentBtnClick() {
    this.formVisible = true;
  }
  addAssignment(newAssignment:Assignment){
    this.assignments.push(newAssignment);
    this.formVisible = false;
  }

}