import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'scan',
    loadChildren: () => import('./scan/scan.module').then((m) => m.ScanModule),
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then((m) => m.SupportModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
