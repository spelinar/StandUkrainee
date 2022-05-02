import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScanResultItemResolver } from '../core/resolvers/scan-result-item.resolver';

import { ScanResultItemComponent } from './container/scan-result-item/scan-result-item.component';
import { ScannerComponent } from './container/scanner/scanner.component';

const routes: Routes = [
  {
    path: '',
    component: ScannerComponent,
  },
  {
    path: ':barcode',
    component: ScanResultItemComponent,
    resolve: {
      brand: ScanResultItemResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanRoutingModule {}
