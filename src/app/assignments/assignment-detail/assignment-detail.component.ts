import { Assignment } from '../assignments.model';
import { AssignmentsService } from '../../shared/assignments.service';

import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  
  onSubmittedAssignment(){
    if (this.transmittedAssignment === undefined) return; 
      this.assignmentService.updateAssignment(this.transmittedAssignment).subscribe(message => {
        console.log(message);
      });
    
  }

  onDelete(){
    if (this.transmittedAssignment === undefined) return;
    this.assignmentService.deleteAssignment(this.transmittedAssignment).subscribe(message => {
      console.log(message)});
      this.transmittedAssignment = undefined;
  }
  getAssignment(){
    const id = this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id).subscribe(assignment => {
      this.transmittedAssignment = assignment;
    });
  }
  

}
