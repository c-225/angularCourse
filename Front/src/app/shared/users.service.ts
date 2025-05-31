import { Injectable } from '@angular/core';
import { User } from '../users/users.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  backendURL = 'http://localhost:8010/api/users';
  users = [];

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  /*
  getUsers():Observable<any> {
    return of(this.users);
  }
    
  getUser(id: number): Observable<User | undefined>{
    const user: User|undefined = this.users.find(a => a.id === id);
    return of(user);
  }
  */
  getUsers():Observable<any> {
    return this.http.get<any>(this.backendURL)
  }
    
  getUser(id: number): Observable<any>{
    return this.http.get<any>(this.backendURL+'/'+id)
  }

  addUser(user: User): Observable<any> {
    //this.users.push(user);
    //this.loggingService.log(user.name, 'added');
    //this.numberOfUsers++;
    //return of('user added');
    return this.http.post<User>(this.backendURL, user)
  }

  updateUser(user: User): Observable<any>{
    //this.loggingService.log(user.name, 'updated');
    //return of('Service: User updated!')
    return this.http.put<string>(this.backendURL, user)
  }
  
  deleteUser(user: User):Observable<any>{
    //let index = this.users.indexOf(user);
    //this.users.splice(index,1);
    //this.loggingService.log(user.name, 'deleted');
    //return of('Service: user added')
    return this.http.delete<string>(this.backendURL +'/'+ user.id)    
  }
}
