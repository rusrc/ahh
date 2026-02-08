import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Vacancy } from '../../models/vacancy.model';
import { MyVacanciesService } from './my-vacancies.service';
import { VacancyShortCardComponent } from '../vacancies/cards/vacancy-short-card/vacancy-short-card.component';
import { VacancyEditCardComponent } from '../vacancies/cards/vacancy-edit-card/vacancy-edit-card.component';

@Component({
  selector: 'app-my-vacancies',
  standalone: true,
  imports: [CommonModule, VacancyShortCardComponent, VacancyEditCardComponent],
  templateUrl: './my-vacancies.component.html',
  styleUrl: './my-vacancies.component.css',
})
export class MyVacanciesComponent {
  private vacanciesService = inject(MyVacanciesService);
  vacancies = signal<Vacancy[]>([]);
  isAdding = signal(false);
  draftVacancy = signal<Vacancy | null>(null);

  constructor() {
    this.vacanciesService.getMyVacancies().subscribe((vacancies) => {
      this.vacancies.set(vacancies ?? []);
    });
  }

  startAddVacancy(): void {
    this.draftVacancy.set({
      id: 'new',
      title: '',
      company: '',
      salary: '',
      description: '',
      tags: [],
    });
    this.isAdding.set(true);
  }

  cancelAddVacancy(): void {
    this.isAdding.set(false);
    this.draftVacancy.set(null);
  }

  saveNewVacancy(updated: Vacancy): void {
    const newVacancy: Vacancy = {
      ...updated,
      id: `hr-${Date.now()}`,
    };
    this.vacancies.set([newVacancy, ...this.vacancies()]);
    this.isAdding.set(false);
    this.draftVacancy.set(null);
  }
}

