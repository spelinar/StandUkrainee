import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { BrandRequestService } from '../services/brand-request.service';
import { BrandService } from '../services/brand.service';
import { GlobalNavbarService } from '../services/global-navbar.service';
import { NotificationService } from '../services/notification.service';
import { BrandDetails } from '../types/brand-details.type';

@Injectable({
  providedIn: 'root',
})
export class ScanResultItemResolver implements Resolve<BrandDetails | null> {
  constructor(
    private brandRequestService: BrandRequestService,
    private brandService: BrandService,
    private globalNavbarService: GlobalNavbarService,
    private notificationService: NotificationService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<BrandDetails | null> {
    if (this.brandRequestService.brand) {
      return of(this.brandRequestService.brand);
    }

    return this.brandService.getProductDetails(route.params.barcode).pipe(
      map(({ brandResponse }) => {
        if (brandResponse[0]) {
          return brandResponse[0];
        }

        throw new Error('Brand not found.');
      }),
      catchError(() => {
        this.notificationService.info('There is no information on this company doing business with Russia');
        this.globalNavbarService.navigateToMenu();

        return of(null);
      })
    );
  }
}
