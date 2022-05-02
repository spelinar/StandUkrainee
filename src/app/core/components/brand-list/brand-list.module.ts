import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { BrandListComponent } from './brand-list.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [BrandListComponent],
  exports: [BrandListComponent],
})
export class BrandListModule {}
