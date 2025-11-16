import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  scheduleData: any;

  constructor(private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state as any;
    this.scheduleData = state?.data || {};
  }
}
