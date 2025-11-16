import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-requirement',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule]
})
export class RequirementComponent {
  currentStep = 0;

  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  states = ['full', 'partial', 'free'];

  // schedule will store schedule['Mon'].status = 'full' | 'partial' | 'free'
  schedule: any = {};

  subjectsForm: FormGroup;
  activitiesForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {

    // Initialize schedule correctly for ngModel binding
    this.weekDays.forEach(day => {
      this.schedule[day] = {
        status: '' // default empty, will be bound via [(ngModel)]
      };
    });

    this.subjectsForm = this.fb.group({
      subjects: this.fb.array([this.createSubject()])
    });

    this.activitiesForm = this.fb.group({
      activities: this.fb.array([this.createActivity()])
    });
  }

  nextStep() {
    this.currentStep++;
  }

  /* --------------------- SUBJECTS --------------------- */

  get subjects() {
    return this.subjectsForm.get('subjects') as FormArray;
  }

  createSubject(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      coefficient: [1, Validators.required],
    });
  }

  addSubject() {
    this.subjects.push(this.createSubject());
  }

  /* --------------------- ACTIVITIES --------------------- */

  get activities() {
    return this.activitiesForm.get('activities') as FormArray;
  }

  createActivity(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      priority: [1, Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  addActivity() {
    this.activities.push(this.createActivity());
  }

  /* --------------------- GENERATE RESULT --------------------- */

  generateSchedule() {
    const userData = {
      schedule: this.schedule,
      subjects: this.subjectsForm.value.subjects,
      activities: this.activitiesForm.value.activities
    };

    console.log(userData);

    this.router.navigate(['/schedule'], { state: { data: userData } });
  }
}
