import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Vacancy } from '../../../../models/vacancy.model';
import { TagSelectorComponent } from '../../../../shared/tag-selector/tag-selector.component';

interface VacancyEditForm {
  title: string;
  company: string;
  salary: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-vacancy-edit-card',
  standalone: true,
  imports: [CommonModule, FormsModule, TagSelectorComponent],
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
    description: '',
    tags: [],
  };

  get title(): string {
    if (!this.vacancy) return 'Вакансия';
    return this.vacancy.id === 'new' ? 'Создание вакансии' : 'Редактирование вакансии';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vacancy'] && this.vacancy) {
      this.form = {
        title: this.vacancy.title ?? '',
        company: this.vacancy.company ?? '',
        salary: this.vacancy.salary ?? '',
        description: this.vacancy.description ?? '',
        tags: [...(this.vacancy.tags ?? [])],
      };
    }
  }

  onSave(): void {
    if (!this.vacancy) return;
    this.save.emit({
      ...this.vacancy,
      title: this.form.title.trim(),
      company: this.form.company.trim(),
      salary: this.form.salary.trim() || undefined,
      description: this.form.description.trim() || undefined,
      tags: this.form.tags.map((tag) => tag.trim()).filter(Boolean),
    });
  }
}
