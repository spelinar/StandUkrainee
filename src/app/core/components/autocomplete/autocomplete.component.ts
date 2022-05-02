import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, of, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { BrandService } from '../../services/brand.service';
import { GlobalNavbarService } from '../../services/global-navbar.service';
import { Brand } from '../../types/brand.type';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent {
  public brands: Brand[] = [];
  public searchbarControl = new FormControl('');
  public noResultsInfoVisible = false;

  private subscription: Subscription | undefined;

  constructor(
    private globalNavbarService: GlobalNavbarService,
    private brandService: BrandService
  ) {}

  public init(): void {
    this.destroy();

    this.subscription = this.searchbarControl.valueChanges
      .pipe(
        tap((value) => {
          if (value.length === 0) {
            this.brands = [];
            this.noResultsInfoVisible = false;
          }
        }),
        switchMap((value) => (value.length > 0
          ? this.brandService.findBrands(value).pipe(catchError(() => of([])))
          : EMPTY
        ))
      )
      .subscribe(
        (brands) => {
          this.brands = [...brands];
          this.noResultsInfoVisible = brands.length === 0;
        },
        () => {
          this.brands = [];
          this.noResultsInfoVisible = true;
        }
      );
  }

  public destroy(): void {
    this.brands = [];
    this.searchbarControl.reset('');

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public get resultsVisible(): boolean {
    return this.brands.length > 0 || this.noResultsInfoVisible;
  }

  public navigateToSearchItem(id: string): void {
    this.globalNavbarService.navigateToSearchItem(id);
  }
}
