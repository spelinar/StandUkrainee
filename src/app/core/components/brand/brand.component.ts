import { Component, Input } from '@angular/core';

import { BrandDetails } from '../../types/brand-details.type';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent {
  @Input()
  public brand: BrandDetails | null = null;

  destroy(): void {
    this.brand = null;
  }
}
