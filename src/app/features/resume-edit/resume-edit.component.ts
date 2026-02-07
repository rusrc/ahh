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
      period: '',
      description: '',
    };
    this.resume.set({
      ...current,
      workExperience: [...current.workExperience, next],
    });
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
