import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { Resume, WorkExperience } from '../../models/resume.model';
import { ResumeService } from './resume.service';

@Component({
  selector: 'app-resume-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resume-detail.component.html',
  styleUrl: './resume-detail.component.css',
})
export class ResumeDetailComponent {
  private route = inject(ActivatedRoute);
  private resumeService = inject(ResumeService);
  resume = signal<Resume | null>(null);

  backLink = '/specialists';
  backLabel = 'Специалисты';

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.resumeService.getResumeById(id).subscribe((resume) => {
        this.resume.set(resume ?? null);
      });
    }
  }

  formatPeriod(exp: WorkExperience): string {
    const start = exp.startDate ? exp.startDate : '—';
    const end = exp.isCurrent ? 'по настоящее время' : exp.endDate ? exp.endDate : '—';
    if (start === '—' && end === '—') {
      return 'Период не указан';
    }
    return `${start} — ${end}`;
  }
}
