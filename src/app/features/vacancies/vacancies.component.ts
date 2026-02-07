import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Vacancy } from '../../models/vacancy.model';
import { VacanciesService } from './vacancies.service';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.css',
})
export class VacanciesComponent {
  private vacanciesService = inject(VacanciesService);
  vacancies = signal<Vacancy[]>([]);
  selectedTag = signal<string | null>(null);

  allTags = computed(() => {
    const set = new Set<string>();
    this.vacancies().forEach((v) => v.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  });

  filteredVacancies = computed(() => {
    const tag = this.selectedTag();
    const vacancies = this.vacancies();
    if (!tag) return vacancies;
    return vacancies.filter((v) => v.tags.includes(tag));
  });

  constructor() {
    this.vacanciesService.getVacancies().subscribe((vacancies) => {
      this.vacancies.set(vacancies ?? []);
    });
  }

  selectTag(tag: string): void {
    this.selectedTag.set(this.selectedTag() === tag ? null : tag);
  }

  respond(vacancy: Vacancy): void {
    console.log('Отклик на вакансию', vacancy.id, vacancy.title);
    alert(`Отклик отправлен на вакансию: ${vacancy.title}`);
  }
}
