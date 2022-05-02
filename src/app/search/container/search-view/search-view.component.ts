import { Component, ViewChild } from '@angular/core';
import { ViewDidEnter, ViewDidLeave } from '@ionic/angular';

import { AutocompleteComponent } from '../../../core/components/autocomplete/autocomplete.component';
import { BrandListComponent } from '../../../core/components/brand-list/brand-list.component';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss'],
})
export class SearchViewComponent implements ViewDidEnter, ViewDidLeave {
  public initiated = false;

  @ViewChild('autocomplete')
  private autocomplete: AutocompleteComponent | undefined;
  @ViewChild('brandList')
  private brandList: BrandListComponent | undefined;

  ionViewDidEnter(): void {
    this.initiated = true;

    if (this.autocomplete) {
      this.autocomplete.init();
    }

    if (this.brandList) {
      this.brandList.init();
    }
  }

  ionViewDidLeave(): void {
    if (this.autocomplete) {
      this.autocomplete.destroy();
    }

    if (this.brandList) {
      this.brandList.destroy();
    }

    this.initiated = false;
  }

  public get autocompleteResultsVisible(): boolean {
    return this.autocomplete?.resultsVisible ?? false;
  }
}
