import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TagService } from '../../core/data/tag.service';

@Component({
  selector: 'app-tag-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tag-selector.component.html',
  styleUrl: './tag-selector.component.css',
})
export class TagSelectorComponent {
  private tagService = inject(TagService);
  private hostRef = inject(ElementRef<HTMLElement>);

  @ViewChild('inputEl') inputEl?: ElementRef<HTMLInputElement>;

  @Input() placeholder = 'Добавить тег';
  @Input() selectedTags: string[] = [];
  @Output() selectedTagsChange = new EventEmitter<string[]>();

  inputValue = '';
  dropdownOpen = false;
  suggestions: string[] = [];
  isLoading = false;
  private searchTimer: number | null = null;

  onInput(value: string): void {
    this.inputValue = value;
    if (!this.dropdownOpen) {
      this.openDropdown();
      return;
    }
    this.queueSearch();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTag(this.inputValue);
      return;
    }

    if (event.key === 'Backspace' && !this.inputValue.trim() && this.selectedTags.length) {
      event.preventDefault();
      this.removeTag(this.selectedTags[this.selectedTags.length - 1]);
    }
  }

  addTag(raw: string): void {
    const value = raw.trim();
    if (!value) return;
    const exists = this.selectedTags.some((tag) => tag.toLowerCase() === value.toLowerCase());
    if (exists) {
      this.inputValue = '';
      return;
    }
    const next = [...this.selectedTags, value];
    this.selectedTags = next;
    this.selectedTagsChange.emit(next);
    this.inputValue = '';
    if (this.dropdownOpen) {
      this.fetchSuggestions();
    }
  }

  selectSuggestion(tag: string): void {
    this.addTag(tag);
  }

  removeTag(tag: string): void {
    const next = this.selectedTags.filter((t) => t !== tag);
    this.selectedTags = next;
    this.selectedTagsChange.emit(next);
    if (this.dropdownOpen) {
      this.fetchSuggestions();
    }
  }

  openDropdown(): void {
    if (this.dropdownOpen) return;
    this.dropdownOpen = true;
    this.fetchSuggestions();
  }

  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  focusInput(): void {
    this.inputEl?.nativeElement.focus();
  }

  private queueSearch(): void {
    if (!this.dropdownOpen) return;
    if (this.searchTimer) {
      window.clearTimeout(this.searchTimer);
    }
    this.isLoading = true;
    this.searchTimer = window.setTimeout(() => {
      this.fetchSuggestions();
    }, 150);
  }

  private fetchSuggestions(): void {
    this.isLoading = true;
    const query = this.inputValue.trim();
    const exclude = this.selectedTags;
    this.tagService.getTags(query, exclude).subscribe({
      next: (tags) => {
        this.suggestions = tags ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.suggestions = [];
        this.isLoading = false;
      },
    });
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent): void {
    const target = event.target as Node | null;
    if (!target) return;
    if (!this.hostRef.nativeElement.contains(target)) {
      this.closeDropdown();
    }
  }
}
