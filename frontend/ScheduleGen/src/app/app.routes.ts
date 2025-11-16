import { Routes } from '@angular/router';
import { RequirementComponent } from './requirement/requirement.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    // Requirement Component Route
    {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'requirement',
    component: RequirementComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: '**',
    redirectTo: 'requirement'
  }
];
