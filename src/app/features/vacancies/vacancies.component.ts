import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Vacancy } from '../../models/vacancy.model';
import { VacanciesService } from './vacancies.service';

@Component({
  selector: 'app-vacancies',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vacancies.component.html',
  styleUrl: './vacancies.component.css',
})
export class VacanciesComponent {
  private vacanciesService = inject(VacanciesService);
  vacancies = signal<Vacancy[]>([]);
  searchQuery = signal('');
  salaryFrom = signal('');
  salaryTo = signal('');
  onlyWithSalary = signal(false);
  selectedTags = signal<string[]>([]);
  tagSearch = signal('');
  remoteTags = signal<string[]>([]);

  allTags = computed(() => {
    const set = new Set<string>();
    this.vacancies().forEach((v) => v.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  });

  topTags = computed(() => this.allTags().slice(0, 15));

  selectedTagSet = computed(() => new Set(this.selectedTags()));

  filteredVacancies = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const from = this.parseNumber(this.salaryFrom());
    const to = this.parseNumber(this.salaryTo());
    const onlySalary = this.onlyWithSalary();
    const selected = this.selectedTagSet();
    return this.vacancies().filter((v) => {
      if (onlySalary && !v.salary) return false;
      if (query) {
        const hay = `${v.title} ${v.company}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      if (selected.size > 0 && !v.tags.some((t) => selected.has(t))) {
        return false;
      }
      if (from !== null || to !== null) {
        const base = this.extractSalary(v.salary);
        if (base === null) return false;
        if (from !== null && base < from) return false;
        if (to !== null && base > to) return false;
      }
      return true;
    });
  });

  constructor() {
    this.vacanciesService.getVacancies().subscribe((vacancies) => {
      this.vacancies.set(vacancies ?? []);
    });

    effect(() => {
      const query = this.tagSearch().trim();
      const exclude = this.selectedTags();
      if (!query) {
        this.remoteTags.set([]);
        return;
      }
      const sub = this.vacanciesService.getTags(query, exclude).subscribe((tags) => {
        this.remoteTags.set(tags ?? []);
      });
      return () => sub.unsubscribe();
    });
  }

  toggleTag(tag: string): void {
    const current = this.selectedTags();
    if (current.includes(tag)) {
      this.selectedTags.set(current.filter((t) => t !== tag));
    } else {
      this.selectedTags.set([...current, tag]);
    }
  }

  clearFilters(): void {
    this.searchQuery.set('');
    this.salaryFrom.set('');
    this.salaryTo.set('');
    this.onlyWithSalary.set(false);
    this.selectedTags.set([]);
    this.tagSearch.set('');
    this.remoteTags.set([]);
  }

  respond(vacancy: Vacancy): void {
    console.log('Отклик на вакансию', vacancy.id, vacancy.title);
    alert(`Отклик отправлен на вакансию: ${vacancy.title}`);
  }

  private extractSalary(value?: string): number | null {
    if (!value) return null;
    const digits = value.match(/\d+/g);
    if (!digits) return null;
    return Number(digits.join(''));
  }

  private parseNumber(value: string): number | null {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    return Number.isFinite(parsed) ? parsed : null;
  }
}
