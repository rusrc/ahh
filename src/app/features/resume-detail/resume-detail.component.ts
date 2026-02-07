import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { Resume } from '../../models/resume.model';
import { ResumeService } from './resume.service';
import { AuthService } from '../../core/auth/auth.service';

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
  private auth = inject(AuthService);
  resume = signal<Resume | null>(null);
  backLink = computed(() => (this.auth.isRole('hr') ? '/specialists' : '/specialist'));
  backLabel = computed(() => (this.auth.isRole('hr') ? 'Специалисты' : 'Мои резюме'));

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.resumeService.getResumeById(id).subscribe((resume) => {
        this.resume.set(resume ?? null);
      });
    }
  }
}
