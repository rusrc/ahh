import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/login/login.component').then((m) => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/register/register.component').then((m) => m.RegisterComponent) },
  { path: 'policy', loadComponent: () => import('./features/policy/policy.component').then((m) => m.PolicyComponent) },
  { path: 'offer', loadComponent: () => import('./features/offer/offer.component').then((m) => m.OfferComponent) },
  {
    path: '',
    canMatch: [authGuard],
    loadComponent: () => import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      { path: '', loadComponent: () => import('./features/vacancies/vacancies.component').then((m) => m.VacanciesComponent) },
      {
        path: 'vacancy/:id',
        loadComponent: () =>
          import('./features/vacancy-detail/vacancy-detail.component').then((m) => m.VacancyDetailComponent),
      },
      {
        path: 'my-cvs',
        canMatch: [roleGuard],
        data: { roles: ['specialist'] },
        loadComponent: () =>
          import('./features/my-cvs/my-cvs.component').then((m) => m.MyCvsComponent),
      },
      { path: 'specialist', redirectTo: 'my-cvs' },
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
      {
        path: 'vacancy-edit/:id',
        canMatch: [roleGuard],
        data: { roles: ['hr'] },
        loadComponent: () =>
          import('./features/vacancy-edit/vacancy-edit.component').then((m) => m.VacancyEditComponent),
      },
      {
        path: 'resume/:id',
        canMatch: [roleGuard],
        data: { roles: ['hr'] },
        loadComponent: () =>
          import('./features/resume-detail/resume-detail.component').then((m) => m.ResumeDetailComponent),
      },
      {
        path: 'resume-edit/:id',
        canMatch: [roleGuard],
        data: { roles: ['specialist'] },
        loadComponent: () =>
          import('./features/resume-edit/resume-edit.component').then((m) => m.ResumeEditComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
