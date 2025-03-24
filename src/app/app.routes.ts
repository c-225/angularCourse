import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { NavigationErrorComponentComponent } from './navigation-error-component/navigation-error-component.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: AssignmentsComponent },
    { path: 'add', component: AddAssignmentComponent },
    { path: 'assignments/:id', component: AssignmentDetailComponent },
    { path: 'assignment/:id', component: AssignmentDetailComponent },
    { path: 'assignments/:id/edit', component: EditAssignmentComponent, canActivate: [authGuard] }, 
    { path: '**', component: NavigationErrorComponentComponent }
];
