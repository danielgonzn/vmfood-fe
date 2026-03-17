import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ApiItemResponse,
  ApiListResponse,
  BrandDto,
  CatalogProductDto,
  CategoryDto,
  WebContentDto,
} from '../models/api.models';

@Injectable({ providedIn: 'root' })
export class CatalogApiService {
  private readonly api = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  getProducts(filters?: {
    search?: string;
    category?: string;
    brand?: string;
    available?: boolean;
    perPage?: number;
  }): Observable<ApiListResponse<CatalogProductDto>> {
    let params = new HttpParams();

    if (filters?.search) params = params.set('search', filters.search);
    if (filters?.category) params = params.set('category', filters.category);
    if (filters?.brand) params = params.set('brand', filters.brand);
    if (filters?.available !== undefined) params = params.set('available', String(filters.available));
    if (filters?.perPage) params = params.set('per_page', String(filters.perPage));

    return this.http.get<ApiListResponse<CatalogProductDto>>(`${this.api}/catalog/products`, { params });
  }

  getProductBySlug(slug: string): Observable<ApiItemResponse<CatalogProductDto>> {
    return this.http.get<ApiItemResponse<CatalogProductDto>>(`${this.api}/catalog/products/${slug}`);
  }

  getCategories(): Observable<ApiListResponse<CategoryDto>> {
    return this.http.get<ApiListResponse<CategoryDto>>(`${this.api}/catalog/categories`);
  }

  getBrands(): Observable<ApiListResponse<BrandDto>> {
    return this.http.get<ApiListResponse<BrandDto>>(`${this.api}/catalog/brands`);
  }

  getWebContent(filters?: { section?: string; key?: string }): Observable<ApiListResponse<WebContentDto>> {
    let params = new HttpParams();

    if (filters?.section) params = params.set('section', filters.section);
    if (filters?.key) params = params.set('key', filters.key);

    return this.http.get<ApiListResponse<WebContentDto>>(`${this.api}/catalog/content`, { params });
  }
}
