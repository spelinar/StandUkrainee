import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { ShareButtonsModule } from '../core/components/share-buttons/share-buttons.module';
import { SubscribeModule } from '../core/components/subscribe/subscribe.module';

import { SupportViewComponent } from './container/support-view/support-view.component';
import { SupportRoutingModule } from './support-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SupportRoutingModule,
    ShareButtonsModule,
    SubscribeModule,
  ],
  declarations: [SupportViewComponent],
})
export class SupportModule {}
