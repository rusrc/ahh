import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  login = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.error.set(null);
    if (!this.login.trim() || !this.password.trim()) {
      this.error.set('Введите логин и пароль');
      return;
    }
    this.loading.set(true);
    this.auth.login(this.login, this.password).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res?.token) {
          this.router.navigate(['/']);
        } else {
          this.error.set('Неверный логин или пароль');
        }
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Ошибка соединения');
      },
    });
  }
}
