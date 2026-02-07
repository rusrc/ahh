import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Vacancy } from '../../models/vacancy.model';
import { MyVacanciesService } from './my-vacancies.service';

@Component({
  selector: 'app-my-vacancies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-vacancies.component.html',
  styleUrl: './my-vacancies.component.css',
})
export class MyVacanciesComponent {
  private vacanciesService = inject(MyVacanciesService);
  vacancies = signal<Vacancy[]>([]);

  constructor() {
    this.vacanciesService.getMyVacancies().subscribe((vacancies) => {
      this.vacancies.set(vacancies ?? []);
    });
  }

  addVacancy(): void {
    const title = prompt('Название вакансии');
    if (!title) return;
    const company = prompt('Компания') ?? 'Моя компания';
    const salary = prompt('Зарплата (необязательно)') ?? '';

    const newVacancy: Vacancy = {
      id: `hr-${Date.now()}`,
      title: title.trim(),
      company: company.trim(),
      tags: [],
      ...(salary.trim() ? { salary: salary.trim() } : {}),
    };

    this.vacancies.set([newVacancy, ...this.vacancies()]);
  }
}
