import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignments/assignments.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { GradesService } from '../shared/grades.service';
import { ActivatedRoute } from '@angular/router';
import { Grades } from './grades.model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-grades',
  imports: [],
  templateUrl: './grades.html',
  styleUrl: './grades.css'
})

export class GradesComponent implements OnInit{

  grade: number;
  weight: number;

  constructor(
    private gradesService: GradesService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.grade = 0;
    this.weight = 1;
  }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.params['id'];
    console.log("ngOnInit of grades", id);

    this.gradesService.getGrades()
      .subscribe(grades => {
        this.grade = grades;
      });
  }

  onSubmit() {
    const newGrade: Grades = {
      id: 0,
      studentId: 0,
      assignmentId: +this.route.snapshot.params['id'],
      gradeValue: this.grade,
      isGraded: true
    };

    this.gradesService.addGrade(newGrade)
      .subscribe(response => {
        console.log('Grade added:', response);
      });
  }

  onUpdate() {
    const updatedGrade: Grades = {
      id: 0,
      studentId: 0,
      assignmentId: +this.route.snapshot.params['id'],
      gradeValue: this.grade,
      isGraded: true
    };

    this.gradesService.updateGrade(updatedGrade)
      .subscribe(response => {
        console.log('Grade updated:', response);
      });
  }
}

