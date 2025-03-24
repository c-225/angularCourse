import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter} from '@angular/material/core';
import { Assignment } from '../assignments.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-assignment',
  imports: [FormsModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatFormFieldModule, MatNativeDateModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})

export class AddAssignmentComponent implements OnInit{
  //@Output()
  //newAssignment = new EventEmitter<Assignment>();
  
  assignmentName = "";
  dueDate!: Date;

  constructor(private assignmentsService: AssignmentsService,  private router:Router) {}
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
    this.router.navigate(['/home']);
  }

}
