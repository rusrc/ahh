import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { Vacancy } from '../../../../models/vacancy.model';

@Component({
  selector: 'app-vacancy-details-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vacancy-details-card.component.html',
  styleUrl: './vacancy-details-card.component.css',
})
export class VacancyDetailsCardComponent {
  @Input({ required: true }) vacancy!: Vacancy;
  @Input() showRespond = false;
  @Input() showEdit = false;
  @Input() editLink: (string | number)[] | string | null = null;
  @Output() respond = new EventEmitter<Vacancy>();

  resolveEditLink(): (string | number)[] | string {
    return this.editLink ?? ['/vacancy-edit', this.vacancy.id];
  }
}
