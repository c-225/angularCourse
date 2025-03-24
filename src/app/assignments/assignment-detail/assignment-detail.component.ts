import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from '../assignments.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-assignment-detail',
  imports: [MatCardModule, CommonModule, MatButtonModule,
    MatCheckboxModule, RouterLink],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {

  @Input()
  transmittedAssignment?: Assignment;
  formVisible: boolean | undefined;

  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  
    console.log("ngOnInit called");
    let queries = this.route.snapshot.queryParams;
    console.log(queries);
    if (queries['debug']) { }
    let fragment = this.route.snapshot.fragment;
    console.log(fragment);

    this.getAssignment();
  }

  getAssignment(): void {
    const _id: string = this.route.snapshot.params['id'];
    console.log("ID = " + _id);
    this.assignmentsService.getAssignment(_id)
      .subscribe(a => {
        this.transmittedAssignment = a;
      });
  }

  submitAssignment(): void {
    if (!this.transmittedAssignment) return;

    this.transmittedAssignment.submitted = true;

    // on demande au service de faire l'update
    this.assignmentsService.updateAssignment(this.transmittedAssignment)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }

  onDeleteAssignment() {
    if (!this.transmittedAssignment) return;
    this.assignmentsService.deleteAssignment(this.transmittedAssignment)
      .subscribe(message => {
        console.log(message);
        this.transmittedAssignment = undefined;
        this.router.navigate(['/home']);
      });
  }

  onCheckboxChange() {
    if (!this.transmittedAssignment) return;

    this.transmittedAssignment.submitted = !this.transmittedAssignment.submitted;
    this.assignmentsService.updateAssignment(this.transmittedAssignment)
      .subscribe(message => {
        console.log(message);
      });
  }

  onNouvelAssignment(event: Assignment) {
    this.assignmentsService.addAssignment(event).subscribe(message => console.log(message));
    this.formVisible = false;
  }
}