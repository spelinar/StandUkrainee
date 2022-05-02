import { Component } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { GlobalNavbarService } from '../../services/global-navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public readonly aboutUrl = environment.aboutUrl;
  constructor(private globalNavbarService: GlobalNavbarService) {}

  public navigateToMenu(): void {
    this.globalNavbarService.navigateToMenu();
  }
}
