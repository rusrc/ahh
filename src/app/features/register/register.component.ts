import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { APP_NAME } from '../../core/config/app.constants';

type RegisterRole = 'specialist' | 'hr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  readonly appName = APP_NAME;
  activeRole = signal<RegisterRole>('specialist');
  loading = signal(false);
  message = signal<string | null>(null);

  form = {
    fullName: '',
    email: '',
    phone: '',
    password: '',
    passwordRepeat: '',
    company: '',
    consentShareContacts: false,
  };

  setRole(role: RegisterRole): void {
    this.activeRole.set(role);
    this.message.set(null);
  }

  onSubmit(): void {
    this.message.set(null);
    if (this.activeRole() === 'hr') {
      this.message.set('Регистрация HR будет платной. Функция скоро появится.');
      return;
    }
    if (!this.form.email.trim() || !this.form.password.trim() || !this.form.fullName.trim()) {
      this.message.set('Заполните обязательные поля.');
      return;
    }
    if (!this.isValidRuPhone(this.form.phone)) {
      this.message.set('Введите корректный номер телефона РФ.');
      return;
    }
    if (this.form.password !== this.form.passwordRepeat) {
      this.message.set('Пароли не совпадают.');
      return;
    }
    if (!this.form.consentShareContacts) {
      this.message.set('Нужно подтвердить согласие на доступ к контактам и фото.');
      return;
    }
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.message.set('Регистрация пока не подключена к серверу.');
    }, 300);
  }

  private isValidRuPhone(value: string): boolean {
    const trimmed = value.trim();
    if (!trimmed) return false;
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length !== 11) return false;
    return digits.startsWith('7') || digits.startsWith('8');
  }
}
