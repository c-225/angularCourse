import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { GradesComponent } from './grades/grades.component';
import { UsersComponent } from './users/users.component';
import { UserDetail } from './users/user-detail/user-detail';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: AssignmentsComponent},
    {path: ':prefix/home', redirectTo: 'home'},
    {path: 'add', component: AddAssignmentComponent},
    {path: 'assignments/:id', component: AssignmentDetailComponent},
    {path: 'assignments/:id/edit', component: EditAssignmentComponent/*, canActivate: [authGuard]*/},
    {path: 'login', component:LoginComponent},
    {path: 'grades/:id', component:GradesComponent},
    {path: 'users', component:UsersComponent},
    {path: 'users/:id', component: UserDetail},
    //{path: '**', redirectTo: 'home', pathMatch: 'full'},
];
