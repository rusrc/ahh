import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import type { Vacancy } from '../../models/vacancy.model';
import { VacanciesService } from '../vacancies/vacancies.service';
import { VacancyDetailsCardComponent } from '../vacancies/cards/vacancy-details-card/vacancy-details-card.component';

@Component({
  selector: 'app-vacancy-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, VacancyDetailsCardComponent],
  templateUrl: './vacancy-detail.component.html',
  styleUrl: './vacancy-detail.component.css',
})
export class VacancyDetailComponent {
  private route = inject(ActivatedRoute);
  private vacanciesService = inject(VacanciesService);
  private authService = inject(AuthService);

  vacancy = signal<Vacancy | null>(null);
  isLoading = signal(true);
  canRespond = computed(() => this.authService.role() !== 'hr');
  canEdit = computed(() => this.authService.role() === 'hr');

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.isLoading.set(false);
      return;
    }
    this.vacanciesService.getVacancyById(id).subscribe((vacancy) => {
      this.vacancy.set(vacancy ?? null);
      this.isLoading.set(false);
    });
  }

  respond(vacancy: Vacancy): void {
    console.log('Отклик на вакансию', vacancy.id, vacancy.title);
    alert(`Отклик отправлен на вакансию: ${vacancy.title}`);
  }
}

