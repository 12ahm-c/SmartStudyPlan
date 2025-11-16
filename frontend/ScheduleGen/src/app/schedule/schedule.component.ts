import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ScheduleComponent implements OnInit {
  isLoading = true;
  days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  formattedSchedule: { [day: string]: { [time: string]: string } } = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.simulateLoading();

    const navState = this.router.getCurrentNavigation()?.extras.state as { scheduleData: any };
    if (navState?.scheduleData) {
      this.formattedSchedule = navState.scheduleData;
    }
  }

  simulateLoading() {
    setTimeout(() => this.isLoading = false, 2000);
  }

  getTimes(day: string): string[] {
    return this.formattedSchedule[day] ? Object.keys(this.formattedSchedule[day]) : [];
  }

  getActivity(day: string, time: string): string {
    return this.formattedSchedule[day]?.[time] || '';
  }
}
