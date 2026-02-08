import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Vacancy } from '../../../models/vacancy.model';

interface VacancyEditForm {
  title: string;
  company: string;
  salary: string;
  tags: string;
}

@Component({
  selector: 'app-vacancy-edit-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vacancy-edit-card.component.html',
  styleUrl: './vacancy-edit-card.component.css',
})
export class VacancyEditCardComponent implements OnChanges {
  @Input({ required: true }) vacancy!: Vacancy | null;
  @Output() save = new EventEmitter<Vacancy>();

  form: VacancyEditForm = {
    title: '',
    company: '',
    salary: '',
    tags: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vacancy'] && this.vacancy) {
      this.form = {
        title: this.vacancy.title ?? '',
        company: this.vacancy.company ?? '',
        salary: this.vacancy.salary ?? '',
        tags: (this.vacancy.tags ?? []).join(', '),
      };
    }
  }

  onSave(): void {
    if (!this.vacancy) return;
    const tags = this.form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    this.save.emit({
      ...this.vacancy,
      title: this.form.title.trim(),
      company: this.form.company.trim(),
      salary: this.form.salary.trim() || undefined,
      tags,
    });
  }
}
