import { NgModule } from '@angular/core';
import { ShareButtonsModule as NgxShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { ShareButtonsComponent } from './share-buttons.component';

@NgModule({
  imports: [
    NgxShareButtonsModule,
    ShareIconsModule,
  ],
  declarations: [ShareButtonsComponent],
  exports: [ShareButtonsComponent],
})
export class ShareButtonsModule {}
