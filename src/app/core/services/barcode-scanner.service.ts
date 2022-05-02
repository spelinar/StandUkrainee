import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, fromEvent, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, mapTo, switchMap, take } from 'rxjs/operators';
import { Barcode, BarcodePicker, ScanResult, ScanSettings } from 'scandit-sdk';
import * as ScanditSDK from 'scandit-sdk';

import { environment } from '../../../environments/environment';

const ENGINE_LOCATION = 'https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build/';
const ENABLED_SYMBOLOGIES = [Barcode.Symbology.EAN8, Barcode.Symbology.EAN13, Barcode.Symbology.UPCA, Barcode.Symbology.UPCE];
const SDK_CONFIG = { engineLocation: ENGINE_LOCATION, preloadEngine: true, preloadBlurryRecognition: true };

const enum Status {
  NULL,
  CREATING,
  READY,
  DESTROYING,
}

@Injectable({
  providedIn: 'root',
})
export class BarcodeScannerService implements OnDestroy {
  public readonly scan$: Observable<{ barcode: string }>;

  private readonly enabledSubject = new Subject<boolean>();
  private readonly statusSubject = new BehaviorSubject<Status>(Status.NULL);

  private barcodePicker: BarcodePicker | null = null;
  private id: string | null = null;
  private status$: Observable<Status>;

  constructor() {
    this.status$ = this.statusSubject.asObservable();
    this.enabledSubject.pipe(
      distinctUntilChanged(),
      switchMap((enable) => this.status$.pipe(
        switchMap((status) => {
          if (
            !enable && [Status.NULL, Status.DESTROYING].includes(status) ||
            enable && [Status.CREATING, Status.READY].includes(status)
          ) {
            return EMPTY;
          }

          if (enable && status === Status.NULL) {
            return of(true);
          }

          if (enable && status === Status.DESTROYING) {
            return this.status$.pipe(filter((s) => s === Status.NULL), take(1), mapTo(true));
          }

          if (!enable && status === Status.CREATING) {
            return this.status$.pipe(filter((s) => s === Status.READY), take(1), mapTo(false));
          }

          if (!enable && status === Status.READY) {
            return of(false);
          }
        })
      ))
    )
      .subscribe((initialized) => {
        if (initialized) {
          this.statusSubject.next(Status.CREATING);
          ScanditSDK.configure(environment.barcodeApiKey, SDK_CONFIG)
            .then(() => this.createBarcodePicker()
              .then((barcodePicker) => {
                this.barcodePicker = barcodePicker;
                this.statusSubject.next(Status.READY);
              })
            );
        } else {
          this.statusSubject.next(Status.DESTROYING);
          this.destroyBarcodePicker();
          setTimeout(() => {
            this.barcodePicker = null;
            this.statusSubject.next(Status.NULL);
          }, 1000);
        }
      });

    this.scan$ = this.status$.pipe(
      filter((status) => status === Status.READY),
      switchMap(() => fromEvent(this.barcodePicker, 'scan')
        .pipe(map((scanResult: ScanResult) => ({ barcode: scanResult.barcodes[0].data })))
      )
    );
  }

  ngOnDestroy(): void {
    this.enabledSubject.complete();
    this.statusSubject.complete();
  }

  public enable(id: string): void {
    this.enabledSubject.next(true);
    this.id = id;
  }

  public disable(): void {
    this.enabledSubject.next(false);
    this.id = null;
  }

  private createBarcodePicker(): Promise<BarcodePicker> {
    if (!this.id) {
      throw new Error('Missing barcode picker element id');
    }

    if (this.barcodePicker) {
      // Add to sentry 'Cannot activate already activated barcode picker'
    }

    return BarcodePicker.create(
      document.getElementById(this.id),
      {
        scanSettings: new ScanSettings({ enabledSymbologies: ENABLED_SYMBOLOGIES, codeDuplicateFilter: 1000 }),
        guiStyle: BarcodePicker.GuiStyle.VIEWFINDER,
      }
    );
  }

  private destroyBarcodePicker(): void {
    if (!this.barcodePicker) {
      return;
    }

    this.barcodePicker.pauseScanning();
    this.barcodePicker.destroy();
  }
}
