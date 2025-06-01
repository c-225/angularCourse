import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from '../assignments/assignments.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { GradesService } from '../shared/grades.service';
import { ActivatedRoute } from '@angular/router';
import { Grades } from './grades.model';
import { AuthService } from '../shared/auth.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-grades',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
  ],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})

export class GradesComponent implements OnInit{
  @Input() transmittedGrade!: Grades;

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
        this.transmittedGrade = grades.find((g: { id: number; }) => g.id === id)
        console.log(this.transmittedGrade);
      });
  }

  onUpdate() {
    const updatedGrade: Grades = {
      id: 0,
      student: 0,
      assignment: +this.route.snapshot.params['id'],
      grade: this.grade,
      graded: true
    };

    this.gradesService.updateGrade(updatedGrade)
      .subscribe(response => {
        console.log('Grade updated:', response);
      });
  }
}

