import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchItemResolver } from '../core/resolvers/search-item.resolver';

import { SearchItemComponent } from './container/search-item/search-item.component';
import { SearchViewComponent } from './container/search-view/search-view.component';

const routes: Routes = [
  {
    path: '',
    component: SearchViewComponent,
  },
  {
    path: ':id',
    component: SearchItemComponent,
    resolve: {
      brand: SearchItemResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
