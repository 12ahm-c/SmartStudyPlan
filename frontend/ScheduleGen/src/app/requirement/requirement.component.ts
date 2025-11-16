import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Activity {
  name: string;
  priority: number;
  startTime: string;
  endTime: string;
}

interface Subject {
  name: string;
  coefficient: number;
}

interface InputData {
  activities: Activity[];
  dailyWork: {
    start: string;
    end: string;
  };
  schedule: { [day: string]: { status: string } };
  subjects: Subject[];
}

function parseScheduleToText(data: InputData): string {
  let text = '';

  // Daily Work
  if (data.dailyWork) {
    text += `Daily Work Hours: ${data.dailyWork.start} - ${data.dailyWork.end}\n\n`;
  }

  // Schedule
  if (data.schedule) {
    text += 'Weekly Schedule Status:\n';
    for (const day of ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']) {
      const status = data.schedule[day]?.status || 'N/A';
      text += `  ${day}: ${status}\n`;
    }
    text += '\n';
  }

  // Subjects
  if (data.subjects && data.subjects.length > 0) {
    text += 'Subjects & Coefficients:\n';
    data.subjects.forEach(subj => {
      text += `  - ${subj.name} (Coefficient: ${subj.coefficient})\n`;
    });
    text += '\n';
  }

  // Activities
  if (data.activities && data.activities.length > 0) {
    text += 'Activities:\n';
    data.activities.forEach(act => {
      text += `  - ${act.name} (Priority: ${act.priority}) from ${act.startTime} to ${act.endTime}\n`;
    });
  }

  return text;
}

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

  schedule: any = {};

  dailyWorkSchedule = {
    start: '',
    end: ''
  };

  subjectsForm: FormGroup;
  activitiesForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize schedule
    this.weekDays.forEach(day => {
      this.schedule[day] = { status: '' };
    });

    // Subjects form
    this.subjectsForm = this.fb.group({
      subjects: this.fb.array([this.createSubject()])
    });

    // Activities form
    this.activitiesForm = this.fb.group({
      activities: this.fb.array([this.createActivity()])
    });
  }

  nextStep() {
    this.currentStep++;
  }

  /* ------------------- SUBJECTS ------------------- */
  get subjects() {
    return this.subjectsForm.get('subjects') as FormArray;
  }

  createSubject(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      coefficient: [1, Validators.required]
    });
  }

  addSubject() {
    this.subjects.push(this.createSubject());
  }

  /* ------------------- ACTIVITIES ------------------- */
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

  /* ------------------- FINAL RESULT ------------------- */
  generateSchedule() {
    const userData: InputData = {
      dailyWork: this.dailyWorkSchedule,
      schedule: this.schedule,
      subjects: this.subjectsForm.value.subjects,
      activities: this.activitiesForm.value.activities
    };

    const text = parseScheduleToText(userData);
    console.log(text);
    console.log(userData);

    this.router.navigate(['/schedule'], { state: { data: userData } });
  }
}
