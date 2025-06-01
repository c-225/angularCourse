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
import { Grades } from '../grades.model';
import { GradesService } from '../../shared/grades.service';
import { UsersService } from '../../shared/users.service';
import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../../assignments/assignments.model';

@Component({
  selector: 'app-grading-list',
  imports: [
    CommonModule, FormsModule,
    //Angular Material
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatDatepickerModule, MatNativeDateModule, MatListModule, RouterLink,],
  templateUrl: './grading-list.html',
  styleUrl: './grading-list.css'
})
export class GradingList {
  
  id!: number;
  student!: number;
  assignment!: number;
  grade!: number;
  graded!: boolean;

  selectedGrade!:Grades;
  transmittedGrade: any;
  grades!: Grades[];
  assignments!: {name: string, subject: string}[];
  userFullNames!: string[];

  constructor(
    private gradeService: GradesService,
    private userService: UsersService,
    private assignmentService: AssignmentsService,
    private router: Router){}

  ngOnInit(): void{
    this.getGrades();

  }

  onSubmit(event:any) {
    console.log(event);
    const newGrade = new Grades();
    newGrade.student = this.student;
    newGrade.assignment = this.assignment;
    newGrade.grade = this.grade;
    newGrade.graded = this.graded;

    this.grades.push(newGrade)
    this.transmittedGrade = this.grades[0]
  }

  clickedGrade(grade:Grades) {
    console.log(grade.id);
    this.selectedGrade = grade;
  }
  onAddGradeBtnClick() {
    //this.formVisible = true;
  }

  getGrades() {
  this.gradeService.getGrades().subscribe(grades => {
    this.grades = grades;
    this.userFullNames = [];
    this.assignments = [];

    this.grades.forEach(grade => {
      // Get user full name
      this.userService.getUser(grade.student).subscribe(user => {
        this.userFullNames[grade.id] = `${user.firstName} ${user.lastName}`;
      });

      // Get assignment name and subject
      this.assignmentService.getAssignment(grade.assignment).subscribe(assignment => {
        this.assignments[grade.id] = {
          name: assignment.name,
          subject: assignment.subject
        };
        console.log(this.assignments[grade.id], this.userFullNames[grade.id]);
      });
    });
  });
}


  getUserFullName(userId: number) {
    let fullName = '';
    this.userService.getUser(userId).subscribe(user => {
      fullName = `${user.firstName} ${user.lastName}`;
      console.log(user)
    });
    //console.log(`Full name for user ${userId}: ${fullName}`);
    return fullName;
  }

  getAssignmentName(assignmentId: number): string {
    let assignmentName = '';
    this.assignmentService.getAssignment(assignmentId).subscribe(assignment => {
      assignmentName = assignment.name;
    });
    return assignmentName;
  }

  getsubjectName(assignmentId: number): string {
    let subjectName = '';
    this.assignmentService.getAssignment(assignmentId).subscribe(assignment => {
      subjectName = assignment.subject;
    });
    console.log(`Subject name for assignment ID ${assignmentId}: ${subjectName}`);
    return subjectName;
  }
}