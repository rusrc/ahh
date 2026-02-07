import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getResumeById } from '../../data/mock-data';
import type { Resume } from '../../models/resume.model';

@Component({
  selector: 'app-resume-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './resume-detail.component.html',
  styleUrl: './resume-detail.component.css',
})
export class ResumeDetailComponent {
  private route = inject(ActivatedRoute);
  resume = signal<Resume | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const r = getResumeById(id);
      this.resume.set(r ?? null);
    }
  }
}
