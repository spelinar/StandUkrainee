import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardViewComponent } from './container/dashboard-view/dashboard-view.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
