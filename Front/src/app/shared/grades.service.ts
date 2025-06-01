import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { Grades } from '../grades/grades.model';

@Injectable({
  providedIn: 'root'
})
export class GradesService {
  backendURL = 'http://localhost:8010/api/grades';
  grades = [];

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  getGrades():Observable<any> {
    return this.http.get<any>(this.backendURL)
  }
    
  setGrade(id: number): Observable<any>{
    return this.http.get<any>(this.backendURL+'/'+id)
  }

  addGrade(grade: Grades): Observable<any> {
    return this.http.post<Grades>(this.backendURL, grade)
  }

  updateGrade(grade: Grades): Observable<any>{
    return this.http.put<string>(this.backendURL, grade)
  }
  
  deleteGrade(grade: Grades):Observable<any>{
    return this.http.delete<string>(this.backendURL +'/'+ grade.id)    
  }
}
