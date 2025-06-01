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
import { RouterLink, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MatGridListModule } from '@angular/material/grid-list';

import { SubmittedDirective } from '../shared/submitted.directive';
import { NotSubmittedDirective } from '../shared/notSubmitted.directive';
import { Assignment } from './assignments.model';
import { AssignmentsService, PaginatedAssignmentsResponse } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments',
  imports: [
    CommonModule, FormsModule,
    //Angular Material
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatDatepickerModule, MatNativeDateModule, MatDivider, MatListModule, RouterLink,
    //My part
    SubmittedDirective, NotSubmittedDirective, 
    MatProgressSpinnerModule, InfiniteScrollDirective, MatGridListModule
],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})

export class AssignmentsComponent implements OnInit{
  
  assignmentName = "";
  assignmentDueDate!:Date;
  addActive = false;
  selectedAssignment!:Assignment;
  transmittedAssignment: any;
  formVisible = false;
  assignments!: Assignment[];

  page: number=1;
  limit: number =5;
  isLoading: boolean = false;
  hasMoreData: boolean = true;

  private allAssignments: Assignment[] = [];
  private totalAssignmentsLoaded = 0;

  constructor(
    private assignmentService: AssignmentsService,
    private router: Router){}

  ngOnInit(): void{
    this.assignments = [];
    this.page = 1;
    this.hasMoreData = true;
    this.getAssignments();
  }

  onSubmit(event:any) {
    console.log(event);
    const newAssignment = new Assignment();
    newAssignment.name = this.assignmentName;
    newAssignment.dueDate = this.assignmentDueDate;
    newAssignment.submitted = false;

    this.assignments.push(newAssignment)
    this.transmittedAssignment = this.assignments[0]
  }

  clickedAssignment(assignment:Assignment) {
    console.log(assignment.id, assignment.name);
    this.selectedAssignment = assignment;
  }
  onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }

  trackById(index: number, item: Assignment): number {
    return item.id!;
  }

  getAssignments() {
    if (this.isLoading || !this.hasMoreData) {
      console.log(`getAssignments: Aborting. isLoading=${this.isLoading}, hasMoreData=${this.hasMoreData}`);
      return;
    }

    this.isLoading = true;
    console.log(`Fetching page ${this.page} with limit ${this.limit}`);

    this.assignmentService.getAssignments(this.page, this.limit).subscribe(
      (response: any) => {
        this.isLoading = false;

        if (Array.isArray(response)) {
          console.warn('Response is an array. Assuming it contains all assignments.');
          if (this.allAssignments.length === 0) {
            this.allAssignments = response as Assignment[];
          }

          const startIndex = this.totalAssignmentsLoaded;
          const endIndex = startIndex + this.limit;
          const nextChunk = this.allAssignments.slice(startIndex, endIndex);

          this.assignments = [...this.assignments, ...nextChunk];
          this.totalAssignmentsLoaded += nextChunk.length;

          this.hasMoreData = this.totalAssignmentsLoaded < this.allAssignments.length;
        } else if (response && Array.isArray(response.docs) && typeof response.hasNextPage === 'boolean') {
          console.log('Response is a paginated object.');
          this.assignments = [...this.assignments, ...response.docs];
          this.hasMoreData = response.hasNextPage;
        } else {
          console.error('Invalid response structure:', response);
          this.hasMoreData = false;
        }

        console.log(`Total assignments loaded: ${this.assignments.length}`);
      },
      (error) => {
        console.error('Error fetching assignments:', error);
        this.isLoading = false;
        this.hasMoreData = false;
      }
    );
  }

  onScroll() {
    console.log('onScroll triggered. isLoading:', this.isLoading, 'hasMoreData:', this.hasMoreData);
    if (!this.isLoading && this.hasMoreData) {
      this.page++;
      this.getAssignments();
    }
  }
  /*
  onNewAssignment(event:Assignment){
    this.assignmentService.addAssignment(event).subscribe(message => console.log(message))
    this.formVisible = false;
  }
  */

}