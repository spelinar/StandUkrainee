import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AutocompleteModule } from '../core/components/autocomplete/autocomplete.module';
import { BrandModule } from '../core/components/brand/brand.module';

import { ScanResultItemComponent } from './container/scan-result-item/scan-result-item.component';
import { ScannerComponent } from './container/scanner/scanner.component';
import { ScanRoutingModule } from './scan-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AutocompleteModule,
    BrandModule,
    ScanRoutingModule,
  ],
  declarations: [
    ScanResultItemComponent,
    ScannerComponent,
  ],
})
export class ScanModule {}
