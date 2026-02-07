import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import type { Resume, WorkExperience } from '../../models/resume.model';
import { ResumeEditService } from './resume-edit.service';

@Component({
  selector: 'app-resume-edit',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './resume-edit.component.html',
  styleUrl: './resume-edit.component.css',
})
export class ResumeEditComponent {
  private route = inject(ActivatedRoute);
  private resumeService = inject(ResumeEditService);

  resume = signal<Resume | null>(null);
  saving = signal(false);
  saved = signal(false);

  backLink = '/my-cvs';
  backLabel = 'Мои резюме';

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.resumeService.getMyResumeById(id).subscribe((resume) => {
        this.resume.set(resume ?? null);
      });
    }
  }

  addExperience(): void {
    const current = this.resume();
    if (!current) return;
    const next: WorkExperience = {
      id: `e-${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
    };
    this.resume.set({
      ...current,
      workExperience: [...current.workExperience, next],
    });
  }

  onCurrentToggle(exp: WorkExperience): void {
    if (exp.isCurrent) {
      exp.endDate = '';
    }
  }

  getPhotoUrl(resume: Resume): string {
    return resume.personalInfo.photoUrl || `https://i.pravatar.cc/120?u=${resume.id}`;
  }

  onPhotoSelected(event: Event, resume: Resume): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (result) {
        resume.personalInfo.photoUrl = result;
      }
      input.value = '';
    };
    reader.readAsDataURL(file);
  }

  removePhoto(resume: Resume): void {
    resume.personalInfo.photoUrl = '';
  }

  removeExperience(id: string): void {
    const current = this.resume();
    if (!current) return;
    this.resume.set({
      ...current,
      workExperience: current.workExperience.filter((e) => e.id !== id),
    });
  }

  save(): void {
    const current = this.resume();
    if (!current) return;
    this.saving.set(true);
    this.saved.set(false);
    this.resumeService.updateMyResume(current.id, current).subscribe({
      next: () => {
        this.saving.set(false);
        this.saved.set(true);
      },
      error: () => {
        this.saving.set(false);
      },
    });
  }
}
