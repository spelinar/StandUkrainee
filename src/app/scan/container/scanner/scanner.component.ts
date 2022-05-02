import { Component } from '@angular/core';
import { ViewDidLeave, ViewWillEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import { BarcodeScannerService } from '../../../core/services/barcode-scanner.service';
import { BrandRequestService } from '../../../core/services/brand-request.service';
import { GlobalNavbarService } from '../../../core/services/global-navbar.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements ViewWillEnter, ViewDidLeave {
  public readonly barcodeScannerId = 'barcode-picker';

  private requestPending = false;
  private subscription = new Subscription();

  constructor(
    private brandRequestService: BrandRequestService,
    private globalNavbarService: GlobalNavbarService,
    private notificationService: NotificationService,
    private barcodeScannerService: BarcodeScannerService
  ) {}

  ionViewWillEnter(): void {
    this.subscription = this.barcodeScannerService.scan$
      .pipe(
        take(1),
        tap(() => this.barcodeScannerService.disable()),
        switchMap(({ barcode }) => this.brandRequestService.checkAndGetBrand(barcode).pipe(map(() => barcode)))
      )
      .subscribe(
        (barcode) => {
          this.navigateToScanResultItem(barcode);
        },
        () => {
          this.notificationService.info('There is no information on this company doing business with Russia');
          this.globalNavbarService.navigateToMenu();
        }
      );

    this.barcodeScannerService.enable(this.barcodeScannerId);
    this.requestPending = false;
  }

  ionViewDidLeave(): void {
    this.barcodeScannerService.disable();
    this.requestPending = false;
    this.subscription.unsubscribe();
  }

  private navigateToScanResultItem(barcode: string): void {
    if (this.requestPending) {
      return;
    }

    this.requestPending = true;
    this.globalNavbarService.navigateToScanResultItem(barcode);
  }
}
