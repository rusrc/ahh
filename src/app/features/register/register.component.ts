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
  phoneError = signal<string | null>(null);

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

  onPhoneInput(value: string): void {
    const trimmed = value.trim();
    if (!trimmed) {
      this.form.phone = '';
      this.phoneError.set(null);
      return;
    }
    const digits = trimmed.replace(/\D/g, '').slice(0, 11);
    if (!digits) {
      this.form.phone = '';
      this.phoneError.set(null);
      return;
    }
    const first = digits[0];
    if (first !== '7' && first !== '8') {
      this.form.phone = digits;
      this.phoneError.set('Введите номер РФ, начиная с +7 или 8.');
      return;
    }
    this.phoneError.set(null);
    const normalized = first === '8' ? `7${digits.slice(1)}` : digits;
    this.form.phone = this.formatRuPhone(normalized);
  }

  private isValidRuPhone(value: string): boolean {
    const trimmed = value.trim();
    if (!trimmed) return false;
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length !== 11) return false;
    return digits.startsWith('7') || digits.startsWith('8');
  }

  private formatRuPhone(digits: string): string {
    const normalized = digits.slice(0, 11);
    const parts = normalized.split('');
    const country = parts[0] ?? '';
    const p1 = parts.slice(1, 4).join('');
    const p2 = parts.slice(4, 7).join('');
    const p3 = parts.slice(7, 9).join('');
    const p4 = parts.slice(9, 11).join('');
    let result = `+${country}`;
    if (p1) result += ` (${p1}`;
    if (p1.length === 3) result += ')';
    if (p2) result += ` ${p2}`;
    if (p3) result += `-${p3}`;
    if (p4) result += `-${p4}`;
    return result;
  }
}
