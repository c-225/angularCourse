import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignments.model';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { bdInitialAssignments } from './data';
@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  backendURL = 'https://angularbackm2mbdsesatic2024-2025.onrender.com/api/assignments';
  assignments:Assignment[] = [];

  constructor(private http:HttpClient) { }

  getAssignmentsPagines(page:number, limit:number):Observable<any> {
    console.log("getAssignmentsPagines has been called");
    const URI = this.backendURL + '?page=' + page + '&limit=' + limit;
    return this.http.get<Assignment[]>(URI);
  }

  getAssignment(_id:string):Observable<Assignment|undefined> {
    console.log("assignment " , _id);
    let URI = this.backendURL + '/' + _id;

    return this.http.get<Assignment>(URI);
  }

  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    this.assignments.push(assignment);
    return of("Assignment ajouté !");
  }

  updateAssignment(assignment:Assignment):Observable<string> {
    return this.http.put<string>(this.backendURL, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<string> {
    return this.http.delete<string>(this.backendURL + '/' + assignment.id);
  }

  peuplerBD() {
    bdInitialAssignments.forEach((a) => {

      let newAssignment = new Assignment();
      newAssignment.name = a.nom;
      newAssignment.dueDate = new Date(a.dateDeRendu);
      newAssignment.submitted = a.rendu;

      this.addAssignment(newAssignment)
      .subscribe(message => {
        console.log(message);
      });
    });
  }
  peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];
 
    bdInitialAssignments.forEach((a) => {
      const newAssignment = new Assignment();
      newAssignment.name = a.nom;
      newAssignment.dueDate = new Date(a.dateDeRendu);
      newAssignment.submitted = a.rendu;
 
      appelsVersAddAssignment.push(this.addAssignment(newAssignment))
    });
    return forkJoin(appelsVersAddAssignment);
  }

  log(assignmentName: string, action: string) {
    console.log("Assignment " + assignmentName + " " + action);
  }
 
}