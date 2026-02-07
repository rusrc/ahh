import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getMyResumes } from '../../data/mock-data';
import type { Resume } from '../../models/resume.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  resumes: Resume[] = getMyResumes();
}
