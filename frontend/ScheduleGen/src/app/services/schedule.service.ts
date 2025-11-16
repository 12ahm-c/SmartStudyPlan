import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Activity {
  name: string;
  priority: number;
  startTime: string;
  endTime: string;
}

export interface Subject {
  name: string;
  coefficient: number;
}

export interface InputData {
  activities: Activity[];
  dailyWork: { start: string; end: string };
  schedule: { [day: string]: { status: string } };
  subjects: Subject[];
}

export interface ScheduleResponse {
  generatedSchedule: any;
  message: string;
  status: string;
  studyplan: { [day: string]: { [time: string]: string } };
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl = 'http://localhost:5000/api/ai'; // backend endpoint

  constructor(private http: HttpClient) { }

  sendSchedule(data: InputData): Observable<ScheduleResponse> {
    return this.http.post<ScheduleResponse>(this.apiUrl, data);
  }
}

