import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { Vacancy } from '../../../../models/vacancy.model';

@Component({
  selector: 'app-vacancy-short-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vacancy-short-card.component.html',
  styleUrl: './vacancy-short-card.component.css',
})
export class VacancyShortCardComponent {
  @Input({ required: true }) vacancy!: Vacancy;
  @Input() showRespond = false;
  @Input() showEdit = false;
  @Input() tagsInteractive = false;
  @Input() selectedTags: ReadonlySet<string> | string[] | null = null;
  @Input() detailsLink: (string | number)[] | string | null = null;
  @Input() editLink: (string | number)[] | string | null = null;

  @Output() respond = new EventEmitter<Vacancy>();
  @Output() tagToggle = new EventEmitter<string>();

  isTagSelected(tag: string): boolean {
    if (!this.selectedTags) return false;
    if (Array.isArray(this.selectedTags)) {
      return this.selectedTags.includes(tag);
    }
    return this.selectedTags.has(tag);
  }

  resolveDetailsLink(): (string | number)[] | string {
    return this.detailsLink ?? ['/vacancy', this.vacancy.id];
  }

  resolveEditLink(): (string | number)[] | string {
    return this.editLink ?? ['/vacancy-edit', this.vacancy.id];
  }

  getDescriptionPreview(limit = 100): string | null {
    const value = this.vacancy.description?.trim();
    if (!value) return null;
    if (value.length <= limit) return value;
    return `${value.slice(0, limit).trim()}...`;
  }
}

