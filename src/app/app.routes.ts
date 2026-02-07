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
      { path: 'profile', loadComponent: () => import('./features/profile/profile.component').then((m) => m.ProfileComponent) },
      { path: 'resume/:id', loadComponent: () => import('./features/resume-detail/resume-detail.component').then((m) => m.ResumeDetailComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];
