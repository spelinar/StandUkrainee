import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewDidLeave } from '@ionic/angular';

import { AutocompleteComponent } from '../../../core/components/autocomplete/autocomplete.component';
import { BrandComponent } from '../../../core/components/brand/brand.component';
import { GlobalNavbarService } from '../../../core/services/global-navbar.service';
import { BrandDetails } from '../../../core/types/brand-details.type';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements ViewDidLeave {
  public brand: BrandDetails | null;

  @ViewChild('autocomplete')
  private autocomplete: AutocompleteComponent | undefined;
  @ViewChild('brandComponent')
  private brandComponent: BrandComponent | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private globalNavbarService: GlobalNavbarService
  ) {}

  ionViewDidEnter(): void {
    if (this.activatedRoute.snapshot.data.hasOwnProperty('brand')) {
      this.brand = this.activatedRoute.snapshot.data.brand;
    }

    if (this.autocomplete) {
      this.autocomplete.init();
    }
  }

  ionViewDidLeave(): void {
    if (this.autocomplete) {
      this.autocomplete.destroy();
    }

    if (this.brandComponent) {
      this.brandComponent.destroy();
    }

    this.brand = null;
  }

  public navigateToScan(): void {
    this.globalNavbarService.navigateToScan();
  }

  public navigateToSearch(): void {
    this.globalNavbarService.navigateToSearch();
  }
}
