import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_NAME } from '../../core/config/app.constants';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css',
})
export class OfferComponent {
  readonly appName = APP_NAME;
}
