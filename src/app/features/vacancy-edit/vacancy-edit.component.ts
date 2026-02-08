import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import type { Vacancy } from '../../models/vacancy.model';
import { MyVacanciesService } from '../my-vacancies/my-vacancies.service';
import { VacancyEditCardComponent } from '../vacancies/cards/vacancy-edit-card/vacancy-edit-card.component';

@Component({
  selector: 'app-vacancy-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, VacancyEditCardComponent],
  templateUrl: './vacancy-edit.component.html',
  styleUrl: './vacancy-edit.component.css',
})
export class VacancyEditComponent {
  private route = inject(ActivatedRoute);
  private vacanciesService = inject(MyVacanciesService);

  vacancy = signal<Vacancy | null>(null);
  isLoading = signal(true);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.isLoading.set(false);
      return;
    }
    this.vacanciesService.getMyVacancyById(id).subscribe((vacancy) => {
      this.vacancy.set(vacancy ?? null);
      this.isLoading.set(false);
    });
  }

  onSave(updated: Vacancy): void {
    this.vacancy.set(updated);
    console.log('Сохранение вакансии', updated);
    alert(`Вакансия сохранена: ${updated.title}`);
  }
}

