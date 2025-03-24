import { Component, OnInit, /*EventEmitter, Output*/ } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';


import { FormsModule } from '@angular/forms';
import { Assignment } from '../assignments.model';
import { AssignmentsService } from '../../shared/assignments.service';


@Component({
  selector: 'app-add-assignment',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent implements OnInit{
  ngOnInit(): void {}

  //@Output() newAssignment = new EventEmitter<Assignment>();
  constructor(private assignmentService: AssignmentsService) {}
  
  assignmentName = "";
  dueDate!: Date;

  onSubmit(event:any) {
    if (this.assignmentName === "" || this.dueDate === null) return;
    
    const assignment = new Assignment();

    assignment.name = this.assignmentName;
    assignment.dueDate = this.dueDate;
    assignment.submitted = false;

    this.assignmentService.addAssignment(assignment).subscribe(message =>{
      console.log(message);
    })
    }

}
