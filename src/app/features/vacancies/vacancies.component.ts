import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MOCK_VACANCIES } from '../../data/mock-data';
import type { Vacancy } from '../../models/vacancy.model';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.css',
})
export class VacanciesComponent {
  vacancies = MOCK_VACANCIES;
  selectedTag = signal<string | null>(null);

  allTags = computed(() => {
    const set = new Set<string>();
    this.vacancies.forEach((v) => v.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  });

  filteredVacancies = computed(() => {
    const tag = this.selectedTag();
    if (!tag) return this.vacancies;
    return this.vacancies.filter((v) => v.tags.includes(tag));
  });

  selectTag(tag: string): void {
    this.selectedTag.set(this.selectedTag() === tag ? null : tag);
  }

  respond(vacancy: Vacancy): void {
    console.log('Отклик на вакансию', vacancy.id, vacancy.title);
    alert(`Отклик отправлен на вакансию: ${vacancy.title}`);
  }
}
