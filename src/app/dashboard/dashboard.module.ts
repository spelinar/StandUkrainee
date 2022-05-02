import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AutocompleteModule } from '../core/components/autocomplete/autocomplete.module';
import { ShareButtonsModule } from '../core/components/share-buttons/share-buttons.module';
import { SubscribeModule } from '../core/components/subscribe/subscribe.module';

import { DashboardViewComponent } from './container/dashboard-view/dashboard-view.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DashboardRoutingModule,
    AutocompleteModule,
    ShareButtonsModule,
    SubscribeModule,
  ],
  declarations: [
    DashboardViewComponent,
  ],
})
export class DashboardModule {}
