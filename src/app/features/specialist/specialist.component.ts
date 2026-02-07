import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Resume } from '../../models/resume.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-specialist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './specialist.component.html',
  styleUrl: './specialist.component.css',
})
export class SpecialistComponent {
  private profileService = inject(ProfileService);
  resumes = signal<Resume[]>([]);

  constructor() {
    this.profileService.getMyResumes().subscribe((resumes) => {
      this.resumes.set(resumes ?? []);
    });
  }
}
