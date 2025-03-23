import { Component, /*, EventEmitter, Output */ 
OnInit} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

import { AssignmentsService } from '../../shared/assignments.service';

import { FormsModule } from '@angular/forms';
import { Assignment } from '../assignments.model';


@Component({
  selector: 'app-add-assignment',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatDatepickerModule, MatButtonModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})

export class AddAssignmentComponent implements OnInit{
  //@Output()
  //newAssignment = new EventEmitter<Assignment>();
  
  assignmentName = "";
  dueDate!: Date;

  constructor(private assignmentsService: AssignmentsService) {}
  ngOnInit(): void { }

  onSubmit(event:any) {
    if (this.assignmentName === "" || this.dueDate === undefined) return;

    const assignment = new Assignment();

    assignment.name = this.assignmentName;
    assignment.dueDate = this.dueDate;
    assignment.submitted = false;
    console.log('assignment emitted: ', assignment );
    this.assignmentsService.addAssignment(assignment)
      .subscribe(message => {
        console.log(message);
      }
    );
  }

}
