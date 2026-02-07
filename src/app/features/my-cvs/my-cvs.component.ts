import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Resume } from '../../models/resume.model';
import { MyCvsService } from './my-cvs.service';

@Component({
  selector: 'app-my-cvs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-cvs.component.html',
  styleUrl: './my-cvs.component.css',
})
export class MyCvsComponent {
  private myCvsService = inject(MyCvsService);
  resumes = signal<Resume[]>([]);

  constructor() {
    this.myCvsService.getMyResumes().subscribe((resumes) => {
      this.resumes.set(resumes ?? []);
    });
  }
}
