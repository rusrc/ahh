import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { Resume } from '../../models/resume.model';
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

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.resumeService.getResumeById(id).subscribe((resume) => {
        this.resume.set(resume ?? null);
      });
    }
  }
}
