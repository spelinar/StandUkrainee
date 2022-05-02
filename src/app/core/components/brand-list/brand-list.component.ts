import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { Breakpoint } from '../../enums/breakpoints.enum';
import { BrandService } from '../../services/brand.service';
import { GlobalNavbarService } from '../../services/global-navbar.service';
import { Brand, BrandListItem } from '../../types/brand.type';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent {
  public readonly Breakpoint = Breakpoint;

  public brands: Brand[] = [];
  public chunkedBrands: BrandListItem[][] = [];
  public deviceWidth: number;

  private subscription: Subscription | undefined;
  private resizeSubscription: Subscription | undefined;

  constructor(
    private globalNavbarService: GlobalNavbarService,
    private brandService: BrandService,
    private platform: Platform
  ) {}

  public init(): void {
    this.destroy();

    this.resizeSubscription = this.platform.resize
      .pipe(startWith(0))
      .subscribe(() => {
        this.deviceWidth = this.platform.width();
      });

    this.subscription = this.brandService.getAllBrands()
      .subscribe(
        (brands) => {
          this.brands = brands;
          this.chunkedBrands = this.chunkBrands(this.addHeadersToBrandList(brands), 3);
        },
        () => {
          this.brands = [];
          this.chunkedBrands = [];
        }
      );
  }

  public destroy(): void {
    this.brands = [];

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  public navigateToSearchItem(id: string): void {
    if (!id) {
      return;
    }

    this.globalNavbarService.navigateToSearchItem(id);
  }

  public headerFn = (brand: Brand, brandIndex: number, brands: Brand[]): string | null => {
    let result = null;

    if (brandIndex !== 0) {
      const prevName = brands[brandIndex - 1].normalizedBrandName || brands[brandIndex - 1].brandName;
      const currName = brand.normalizedBrandName || brand.brandName;

      if (prevName !== null && currName !== null) {
        const prevCharCode = prevName.toUpperCase().charCodeAt(0);
        const currCharCode = currName.toUpperCase().charCodeAt(0);

        if (prevCharCode !== currCharCode) {
          const prevChar = prevName.toUpperCase().charAt(0);
          const currChar = currName.toUpperCase().charAt(0);
          const prevIsLetter = this.isLetter(prevChar);

          if (!prevIsLetter) {
            result = this.isLetter(currChar) ? currName.toUpperCase().charAt(0) : null;
          } else {
            result = this.isLetter(currChar) ? currName.toUpperCase().charAt(0) : '#';
          }
        }
      }
    } else {
      result = (brand.normalizedBrandName || brand.brandName).toUpperCase().charAt(0);
    }

    return result;
  };

  private isLetter(char: string): boolean {
    return /[a-zA-Z]/.test(char);
  }

  private addHeadersToBrandList(brands: Brand[]): BrandListItem[] {
    const newBrandList = [];

    for (let i = 0; i < brands.length; i++) {
      const char = this.headerFn(brands[i], i, brands);

      if (char) {
        newBrandList.push({ header: char });
      }

      newBrandList.push(brands[i]);
    }

    return newBrandList;
  }

  private chunkBrands(brands: BrandListItem[], numberOfChunks: number): Brand[][] {
    return [...Array(numberOfChunks)].map(
      (_, index) => brands.slice(
        index * Math.ceil(brands.length / numberOfChunks),
        (index + 1) * Math.ceil(brands.length / numberOfChunks)
      )
    );
  }
}
