import { Assignment } from '../assignments.model';

import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  imports:[MatCardModule, MatCheckboxModule, CommonModule],
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit{
  @Input() transmittedAssignment: Assignment | undefined;

  constructor() { }
  ngOnInit(): void { }

}
