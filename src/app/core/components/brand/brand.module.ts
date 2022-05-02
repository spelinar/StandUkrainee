import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ShareButtonsModule } from '../share-buttons/share-buttons.module';

import { BrandComponent } from './brand.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ShareButtonsModule,
  ],
  declarations: [BrandComponent],
  exports: [BrandComponent],
})
export class BrandModule {}
