import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignments.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
 selector: 'app-edit-assignment',
 standalone: true,
 providers: [provideNativeDateAdapter()],
 imports: [
   FormsModule,
   MatInputModule,
   MatFormFieldModule,
   MatDatepickerModule,
   MatButtonModule,
 ],

 templateUrl: './edit-assignment.component.html',
 styleUrl: './edit-assignment.component.css',
})

export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  newAssignmentName = '';
  newDueDate?: Date = undefined;
 
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route:ActivatedRoute
  ) {}
 
  ngOnInit() {
    
    console.log("Query Params :" + this.route.snapshot.queryParams);
    console.log("Fragment :" + this.route.snapshot.fragment);
    
    const id:number = +this.route.snapshot.params['id'];
    console.log("ngOnInit of assignment-edit", id)

    this.assignmentsService.getAssignment(id).subscribe(assignment => {
      console.log(assignment)
      this.assignment = assignment;
      if (this.assignment) {
        this.newAssignmentName = this.assignment.name;
        this.newDueDate = this.assignment.dueDate;
      }
    });

  }
  onSaveAssignment() {
    console.log('save')
    if (!this.assignment) return;
    if (this.newAssignmentName == '' || this.newDueDate === undefined) return;
 
    // on récupère les valeurs dans le formulaire
    this.assignment.name = this.newAssignmentName;
    this.assignment.dueDate = this.newDueDate;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }
 }
 