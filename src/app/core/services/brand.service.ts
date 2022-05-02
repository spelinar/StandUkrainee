import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { VsRussiaStatus } from '../enums/vs-russia-status.enum';
import { BrandDetails } from '../types/brand-details.type';
import { Brand } from '../types/brand.type';
import { OtherBrand } from '../types/other-brand.type';
import { Product } from '../types/product.type';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}

  public getAllBrands(): Observable<Brand[]> {
    return this.http
      .get<{
        companyId: string;
        name: string;
        normalizedName: string;
      }[]>(`${environment.apiUrl}againstwar/brand/list`)
      .pipe(
        map((data) => (
          Array.isArray(data)
            ? data
              .map((item) => ({ id: item.companyId, brandName: item.name, normalizedBrandName: item.normalizedName }))
              .sort((a, b) => this.sortByFirstLetter(a.normalizedBrandName || a.brandName, b.normalizedBrandName || b.brandName))
            : []
        ))
      );
  }

  public findBrands(brandName: string): Observable<Brand[]> {
    return this.http
      .get<{
        id: string;
        brandName: string;
        companyName: string;
      }[]>(`${environment.apiUrl}againstwar/brand/search/${brandName}`)
      .pipe(
        map((data) => (
          Array.isArray(data)
            ? data.map((item) => ({ id: item.id, brandName: item.brandName, companyName: item.companyName }))
            : []
        ))
      );
  }

  public getBrandDetails(id: string): Observable<BrandDetails> {
    return this.http
      .get<{
        id: string;
        company: string;
        headquarters: string;
        articles: any[];
        lastDeployedUpdate: string;
        logo: string;
        color: number;
        vsRussia: string;
        shortvsRussia: string;
        brandList: { name: string; logoUrl: string }[];
      }>(`${environment.apiUrl}againstwar/brand/${id}`)
      .pipe(
        map((data) => ({
          id: data.id,
          company: data.company,
          headquarters: data.headquarters,
          articles: data.articles,
          lastDeployedUpdate: data.lastDeployedUpdate,
          logo: data.logo,
          color: data.color,
          vsRussia: data.vsRussia,
          shortvsRussia: data.shortvsRussia,
          vsRussiaStatus: this.vsRussiaMatcher(data.color),
          otherBrands: this.getSortedOtherBrandsByCompanyName(data.brandList, data.company),
        }))
      );
  }

  public getProductDetails(identifier: string): Observable<Product> {
    return this.http
      .get<{
          productName: string;
          brandResponse: {
            id: string;
            company: string;
            headquarters: string;
            articles: any[];
            lastDeployedUpdate: string;
            logo: string;
            color: number;
            vsRussia: string;
            shortvsRussia: string;
            brandList: { name: string; logoUrl: string }[];
          }[];
          countryOfOrigin: string[];
          fromBelarus: boolean;
          fromRussia: boolean;
      }>(`${environment.apiUrl}againstwar/product/${identifier}`)
      .pipe(
        map((data) => ({
          productName: data.productName,
          brandResponse: data.brandResponse.map((brand) => ({
            id: brand.id,
            company: brand.company,
            headquarters: brand.headquarters,
            articles: brand.articles,
            lastDeployedUpdate: brand.lastDeployedUpdate,
            logo: brand.logo,
            color: brand.color,
            vsRussia: brand.vsRussia,
            shortvsRussia: brand.shortvsRussia,
            vsRussiaStatus: this.vsRussiaMatcher(brand.color),
            otherBrands: this.getSortedOtherBrandsByCompanyName(brand.brandList, brand.company),
          })),
          countryOfOrigin: data.countryOfOrigin,
          fromBelarus: data.fromBelarus,
          fromRussia: data.fromRussia,
        }))
      );
  }

  private sortByFirstLetter(a: string, b: string): number {
    const charactersOrder = 'abcdefghijklmnopqrstuvwxyz01234567989*!@_.()#^&%-=+';
    const aNormalized = a.toLocaleUpperCase();
    const bNormalized = b.toLocaleUpperCase();
    const aIndex = charactersOrder.indexOf(aNormalized[0]);
    const bIndex = charactersOrder.indexOf(bNormalized[0]);

    if (aIndex === bIndex) {
      if (aNormalized < bNormalized) {
        return -1;
      } else if (aNormalized > bNormalized) {
        return 1;
      }

      return 0;
    }

    return aIndex - bIndex;
  }

  private getSortedOtherBrandsByCompanyName(otherBrands: OtherBrand[], companyName: string): OtherBrand[] {
    return [
      ...otherBrands.filter((otherBrand) => !otherBrand.name.includes(companyName) && !companyName.includes(otherBrand.name)),
      ...otherBrands.filter((otherBrand) => otherBrand.name.includes(companyName) || companyName.includes(otherBrand.name)),
    ];
  }

  private vsRussiaMatcher(color: number): VsRussiaStatus {
    if (color === 1) {
      return VsRussiaStatus.stopped;
    }

    if (color === 2) {
      return VsRussiaStatus.continues;
    }

    return VsRussiaStatus.unknown;
  }
}
