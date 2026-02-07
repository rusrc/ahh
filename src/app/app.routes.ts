import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent) },
  {
    path: '',
    canMatch: [authGuard],
    loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./features/vacancies/vacancies.component').then((m) => m.VacanciesComponent) },
      { path: 'specialist', loadComponent: () => import('./features/specialist/specialist.component').then((m) => m.SpecialistComponent) },
      { path: 'resume/:id', loadComponent: () => import('./features/resume-detail/resume-detail.component').then((m) => m.ResumeDetailComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];
