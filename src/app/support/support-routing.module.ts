import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SupportViewComponent } from './container/support-view/support-view.component';

const routes: Routes = [
  {
    path: '',
    component: SupportViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportRoutingModule {}
