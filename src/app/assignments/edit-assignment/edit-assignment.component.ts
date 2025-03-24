import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignments.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { Router } from '@angular/router';

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

export class EditAssignmentComponent {
  assignment: Assignment | undefined;
  // Pour les champs de formulaire
  nomAssignment = '';
  dateDeRendu?: Date = undefined;
 
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router
  ) {}
 
  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;
 
    // on récupère les valeurs dans le formulaire
    this.assignment.name = this.nomAssignment;
    this.assignment.dueDate = this.dateDeRendu;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
 
        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
 }
 
 