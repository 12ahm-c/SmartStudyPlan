import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  imports: [ CommonModule, ]
})
export class ScheduleComponent implements OnInit {
  @Input() scheduleData: any;

  isLoading = true;

  days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  formattedSchedule: any = {

      "Mon": {
        "18:30-20:00": "cloud",
        "21:00-23:00": "math"
      },
      "Tue": {
        "10:00-12:00": "cloud",
        "14:00-16:00": "math",
        "16:00-18:00": "oracle",
        "18:30-20:00": "Archi SOA",
        "21:00-23:00": "cerf,Pyth"
      },
      "Wed": {
        "18:30-20:00": "cloud",
        "21:00-23:00": "math"
      },
      "Thu": {
        "18:30-20:00": "cloud",
        "21:00-23:00": "oracle"
      },
      "Fri": {
        "18:30-20:00": "Archi SOA",
        "21:00-23:00": "cerf,Pyth"
      },
      "Sat": {
        "18:30-20:00": "J2e avance",
        "21:00-23:00": "math"
      },
      "Sun": {
        "10:00-12:00": "cloud",
        "14:00-16:00": "math",
        "16:00-18:00": "oracle",
        "18:30-20:00": "Archi SOA",
        "21:00-23:00": "J2e avance"
      }
    
  }
    ;

  ngOnInit() {
    this.simulateLoading();
    // this.formatSchedule();
  }

  simulateLoading() {
    // 2 second "Generating..." animation
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  formatSchedule() {
    if (!this.scheduleData || !this.scheduleData.generatedSchedule) return;
    this.formattedSchedule = this.scheduleData.generatedSchedule;
  }

  getTimes(day: string): string[] {
    return this.formattedSchedule[day]
      ? Object.keys(this.formattedSchedule[day])
      : [];
  }
}
