import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignments.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
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

  constructor(private loggingService:LoggingService) { }

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
  }

  addAssignment(assignment: Assignment): Observable<string> {
    this.assignments.push(assignment);
    this.loggingService.log(assignment.name, 'added');
    return of('assignment added');
  }

  updateAssignment(assignment: Assignment): Observable<string>{
    this.loggingService.log(assignment.name, 'updated');
    return of('Service: Assignment updated!')
  }
  
  deleteAssignment(assignment: Assignment):Observable<string>{
    let index = this.assignments.indexOf(assignment);
    this.assignments.splice(index,1);
    this.loggingService.log(assignment.name, 'deleted');
    return of('Service: Assignment deleted')
  }
}
