import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { BrandDetails } from '../types/brand-details.type';
import { Product } from '../types/product.type';

import { BrandService } from './brand.service';
import { NotificationService } from './notification.service';

const MAX_ATTEMPTS = 5;

@Injectable({
  providedIn: 'root',
})
export class BrandRequestService {
  public brand: BrandDetails | null = null;

  private count = 0;

  constructor(
    private brandService: BrandService,
    private notificationService: NotificationService
  ) {}

  public checkAndGetBrand(barcode: string): Observable<BrandDetails> {
    this.brand = null;
    this.count = 0;

    return this.getProduct(barcode)
      .pipe(
        take(1),
        map(({ brandResponse }) => brandResponse[0]),
        tap((brand) => {
          this.notificationService.close();
          this.brand = brand;
        })
      );
  }

  private getProduct(barcode: string): Observable<Product> {
    return this.brandService.getProductDetails(barcode)
      .pipe(
        tap(() => {
          this.count++;

          if (this.count === 1) {
            this.notificationService.custom('Please wait, we are looking for a company');
          }
        }),
        switchMap((product) => (this.count >= MAX_ATTEMPTS
          ? throwError('Brand not found.')
          : product.brandResponse[0]
            ? of(product)
            : this.getProduct(barcode)
        ))
      );
  }
}
