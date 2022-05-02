import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AutocompleteModule } from '../core/components/autocomplete/autocomplete.module';
import { BrandListModule } from '../core/components/brand-list/brand-list.module';
import { BrandModule } from '../core/components/brand/brand.module';

import { SearchItemComponent } from './container/search-item/search-item.component';
import { SearchViewComponent } from './container/search-view/search-view.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AutocompleteModule,
    BrandListModule,
    BrandModule,
    SearchRoutingModule,
  ],
  declarations: [SearchItemComponent, SearchViewComponent],
})
export class SearchModule {}
