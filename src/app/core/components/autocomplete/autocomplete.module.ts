import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  declarations: [AutocompleteComponent],
  exports: [AutocompleteComponent],
})
export class AutocompleteModule {}
