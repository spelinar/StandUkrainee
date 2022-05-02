import { Component } from '@angular/core';

import { GlobalNavbarService } from '../../services/global-navbar.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private globalNavbarService: GlobalNavbarService) {}

  public navigateToSearch(): void {
    this.globalNavbarService.navigateToSearch();
  }

  public navigateToScan(): void {
    this.globalNavbarService.navigateToScan();
  }

  public navigateToSupport(): void {
    this.globalNavbarService.navigateToSupport();
  }
}
