import { Component } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-support-view',
  templateUrl: './support-view.component.html',
  styleUrls: ['./support-view.component.scss'],
})
export class SupportViewComponent {
  public contactUs(): void {
    window.location.href = `mailto:${environment.contactEmail}`;
  }
}
