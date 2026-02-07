import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent) },
  {
    path: '',
    canMatch: [authGuard],
    loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./features/vacancies/vacancies.component').then((m) => m.VacanciesComponent) },
      {
        path: 'specialist',
        canMatch: [roleGuard],
        data: { roles: ['specialist'] },
        loadComponent: () =>
          import('./features/specialist/specialist.component').then((m) => m.SpecialistComponent),
      },
      {
        path: 'specialists',
        canMatch: [roleGuard],
        data: { roles: ['hr'] },
        loadComponent: () =>
          import('./features/specialists/specialists.component').then((m) => m.SpecialistsComponent),
      },
      {
        path: 'my-vacancies',
        canMatch: [roleGuard],
        data: { roles: ['hr'] },
        loadComponent: () =>
          import('./features/my-vacancies/my-vacancies.component').then((m) => m.MyVacanciesComponent),
      },
      { path: 'resume/:id', loadComponent: () => import('./features/resume-detail/resume-detail.component').then((m) => m.ResumeDetailComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];
