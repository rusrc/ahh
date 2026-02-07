import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Resume } from '../../models/resume.model';
import { SpecialistsService } from './specialists.service';

@Component({
  selector: 'app-specialists',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './specialists.component.html',
  styleUrl: './specialists.component.css',
})
export class SpecialistsComponent {
  private specialistsService = inject(SpecialistsService);
  specialists = signal<Resume[]>([]);

  constructor() {
    this.specialistsService.getSpecialists().subscribe((resumes) => {
      this.specialists.set(resumes ?? []);
    });
  }
}
