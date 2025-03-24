import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: User[] = [
    { id: 1, username: 'admin', password: 'admin', isAdmin: true },
    { id: 2, username: 'user', password: 'user', isAdmin: false },
    { id: 3, username: 'user2', password: 'user2', isAdmin: false }
  ];

  currentUser: User | null = null;
  loggedIn: boolean = false;

  constructor() {
    // Récupérer l'utilisateur du localStorage si disponible
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.loggedIn = true;
    }
  }

  logIn(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      this.currentUser = user;
      this.loggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logOut() {
    this.loggedIn = false;
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  setAdmin(isAdmin: boolean) {
    if (this.currentUser) {
      this.currentUser.isAdmin = isAdmin;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
    this.loggedIn = isAdmin;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  isAdmin() {
    const isUserAdmin = new Promise<boolean>(
      (resolve, reject) => {
        resolve(this.currentUser?.isAdmin || false);
      });
    return isUserAdmin;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}