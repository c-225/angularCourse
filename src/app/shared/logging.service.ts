import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  log(assignmentName:string, action:string){
    console.log(`Assignment ${assignmentName} " " ${action}`);
  }

  constructor() { }
}
