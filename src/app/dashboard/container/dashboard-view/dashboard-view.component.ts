import { Component, ViewChild } from '@angular/core';
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';

import { environment } from '../../../../environments/environment';
import { AutocompleteComponent } from '../../../core/components/autocomplete/autocomplete.component';
import { GlobalNavbarService } from '../../../core/services/global-navbar.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent implements ViewDidEnter, ViewDidLeave {
  public readonly aboutUrl = environment.aboutUrl;

  @ViewChild('autocomplete')
  private autocomplete: AutocompleteComponent | undefined;

  constructor(private globalNavbarService: GlobalNavbarService) {}

  ionViewDidEnter(): void {
    if (this.autocomplete) {
      this.autocomplete.init();
    }
  }

  ionViewDidLeave(): void {
    if (this.autocomplete) {
      this.autocomplete.destroy();
    }
  }

  public navigateToScan(): void {
    this.globalNavbarService.navigateToScan();
  }

  public navigateToSearch(): void {
    this.globalNavbarService.navigateToSearch();
  }
}
