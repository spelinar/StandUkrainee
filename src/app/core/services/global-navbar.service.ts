import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GlobalNavbarService {
  constructor(private router: Router) {}

  public navigateToMenu(): void {
    this.router.navigateByUrl('');
  }

  public navigateToSearch(): void {
    this.router.navigateByUrl('search');
  }

  public navigateToSearchItem(id: string): void {
    this.router.navigateByUrl(`search/${id}`);
  }

  public navigateToScan(): void {
    this.router.navigateByUrl('scan');
  }

  public navigateToScanResultItem(barcode: string): void {
    this.router.navigateByUrl(`scan/${barcode}`);
  }

  public navigateToSupport(): void {
    this.router.navigateByUrl('support');
  }
}
