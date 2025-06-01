import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignments.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  backendURL = 'http://localhost:8010/api/assignments';
  assignments = [];

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  /*
  getAssignments():Observable<any> {
    return of(this.assignments);
  }
    
  getAssignment(id: number): Observable<Assignment | undefined>{
    const assignment: Assignment|undefined = this.assignments.find(a => a.id === id);
    return of(assignment);
  }
  */
  getAssignments():Observable<any> {
    return this.http.get<any>(this.backendURL)
  }
    
  getAssignment(id: number): Observable<any>{
    return this.http.get<any>(this.backendURL+'/'+id)
  }

  addAssignment(assignment: Assignment): Observable<any> {
    //this.assignments.push(assignment);
    //this.loggingService.log(assignment.name, 'added');
    //this.numberOfAssignments++;
    //return of('assignment added');
    return this.http.post<Assignment>(this.backendURL, assignment)
  }

  updateAssignment(assignment: Assignment): Observable<any>{
    //this.loggingService.log(assignment.name, 'updated');
    //return of('Service: Assignment updated!')
    return this.http.put<string>(this.backendURL, assignment)
  }

  getAssignmentPagination(page: number, limit: number) {
    return this.http.get<any>(`${this.backendURL}/assignments?page=${page}&limit=${limit}`);
  }
  
  deleteAssignment(assignment: Assignment):Observable<any>{
    //let index = this.assignments.indexOf(assignment);
    //this.assignments.splice(index,1);
    //this.loggingService.log(assignment.name, 'deleted');
    //return of('Service: assignment added')
    return this.http.delete<string>(this.backendURL +'/'+ assignment.id)    
  }
}
