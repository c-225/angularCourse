import { Assignment } from '../assignments.model';
import { AssignmentsService } from '../../shared/assignments.service';

import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';


@Component({
  imports:[MatCardModule, MatCheckboxModule, CommonModule],
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit{
  @Input() transmittedAssignment!: Assignment;

  constructor(private assignmentService: AssignmentsService) { }

  ngOnInit(): void {
  }
  
  onSubmittedAssignment(){
    this.assignmentService.updateAssignment(this.transmittedAssignment).subscribe(message => {
      console.log(message);
    });
  }

  onDelete(){
    this.assignmentService.deleteAssignment(this.transmittedAssignment).subscribe(message => {
      console.log(message)});
      this.transmittedAssignment = null;
  }
  

}
