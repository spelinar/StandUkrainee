import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BrandService } from '../services/brand.service';
import { GlobalNavbarService } from '../services/global-navbar.service';
import { NotificationService } from '../services/notification.service';
import { BrandDetails } from '../types/brand-details.type';

@Injectable({
  providedIn: 'root',
})
export class SearchItemResolver implements Resolve<BrandDetails | null> {
  constructor(
    private brandService: BrandService,
    private globalNavbarService: GlobalNavbarService,
    private notificationService: NotificationService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<BrandDetails | null> {
    return this.brandService.getBrandDetails(route.params.id).pipe(
      catchError(() => {
        this.notificationService.info('There is no information on this company doing business with Russia');
        this.globalNavbarService.navigateToMenu();

        return of(null);
      })
    );
  }
}
