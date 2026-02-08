import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  inject,
  OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TagService } from '../../core/data/tag.service';

@Component({
  selector: 'app-tag-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tag-selector.component.html',
  styleUrl: './tag-selector.component.css',
})
export class TagSelectorComponent implements OnDestroy {
  private tagService = inject(TagService);
  private hostRef = inject(ElementRef<HTMLElement>);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('inputEl') inputEl?: ElementRef<HTMLInputElement>;

  @Input() placeholder = 'Добавить тег';
  @Input() selectedTags: string[] = [];
  @Output() selectedTagsChange = new EventEmitter<string[]>();

  inputValue = '';
  dropdownOpen = false;
  suggestions: string[] = [];
  isLoading = false;
  private searchTimer: number | null = null;
  private requestSub?: Subscription;
  private destroyed = false;

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
    this.isLoading = false;
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
    if (this.searchTimer) {
      window.clearTimeout(this.searchTimer);
      this.searchTimer = null;
    }
    this.requestSub?.unsubscribe();
    this.isLoading = true;
    const query = this.inputValue.trim();
    const exclude = this.selectedTags ?? [];
    console.log('[tag-selector] fetchSuggestions start', { query, exclude, dropdownOpen: this.dropdownOpen });
    let sub: Subscription;
    let request$;
    try {
      request$ = this.tagService.getTags(query, exclude);
    } catch {
      this.suggestions = [];
      this.isLoading = false;
      console.log('[tag-selector] getTags threw synchronously');
      return;
    }
    const safeRequest$ = request$.pipe(
      finalize(() => {
        if (this.requestSub === sub) {
          this.isLoading = false;
          this.requestSub = undefined;
          console.log('[tag-selector] request finalize', { suggestions: this.suggestions.length });
          this.triggerChangeDetection();
        }
      })
    );
    sub = safeRequest$.subscribe({
      next: (tags) => {
        this.suggestions = tags ?? [];
        console.log('[tag-selector] request next', { count: this.suggestions.length });
        this.triggerChangeDetection();
      },
      error: () => {
        this.suggestions = [];
        console.log('[tag-selector] request error');
        this.triggerChangeDetection();
      },
    });
    this.requestSub = sub;
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.requestSub?.unsubscribe();
  }

  private triggerChangeDetection(): void {
    if (this.destroyed) return;
    this.cdr.detectChanges();
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
