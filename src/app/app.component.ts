import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { environment } from '../environments/environment';

declare let gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnDestroy {
  public showHeader = false;

  private readonly subscription = new Subscription();

  constructor(
    private router: Router
  ) {
    this.initAnalytics();

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(
        (navigationEnd: NavigationEnd) => {
          this.showHeader = navigationEnd.urlAfterRedirects !== '/scan';
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initAnalytics(): void {
    const script: HTMLScriptElement = document.createElement('script');

    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.analytics}`;

    document.head.prepend(script);
    this.subscription.add(
      this.router.events
        .pipe(filter((navigation) => navigation instanceof NavigationEnd))
        .subscribe((navigationEnd: NavigationEnd) => {
          gtag('config', environment.analytics, { page_path: navigationEnd.urlAfterRedirects });
        })
    );
  }
}
