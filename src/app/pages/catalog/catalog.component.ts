import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CATALOG_PRODUCTS } from './catalog.data';
import { CatalogProduct } from './catalog.models';
import { SeoService } from '../../shared/services/seo.service';
import { CatalogApiService } from '../../core/services/catalog-api.service';
import { CatalogProductDto } from '../../core/models/api.models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [FormsModule, MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="min-h-screen bg-gray-50 pt-32">
      <div class="relative w-full h-[360px] md:h-[400px] overflow-hidden">
          <img
            src="/images/banners/bannerFilter.jpg"
            alt="Banner catálogo VM Food Import"
            class="absolute inset-0 w-full h-full object-cover"
            referrerpolicy="no-referrer"
          >
          <div class="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/20"></div>

          <div class="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end">
            <div class="pb-6 md:pb-10 text-white max-w-3xl">
              <p class="text-xs md:text-sm uppercase tracking-[0.2em] font-semibold text-white/90 mb-3">VM Food Import</p>
              <h1 class="text-3xl md:text-5xl font-extrabold leading-tight mb-3">Catálogo de maquinaria y soluciones industriales</h1>
              <p class="text-sm md:text-base text-white/90">Explora equipos para procesamiento de carnes y embutidos con respaldo técnico especializado.</p>
            </div>
          </div>
        </div>

      <div class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div class="flex items-center justify-between mb-6">
          <button routerLink="/" class="inline-flex items-center gap-2 text-gray-700 hover:text-vm-red font-medium">
            <mat-icon>arrow_back</mat-icon>
            Volver al inicio
          </button>
          <h1 class="text-xl md:text-2xl font-bold text-black">Catálogo Completo</h1>
        </div>

        @if (loadError) {
          <div class="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            No pudimos sincronizar el catálogo con el servidor. Revisa la conexión e intenta nuevamente.
          </div>
        }

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside class="lg:col-span-4 xl:col-span-3">
            <div class="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 lg:sticky lg:top-32">
              <h2 class="text-lg font-bold text-black mb-4">Filtros</h2>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                  <input [(ngModel)]="searchTerm" (ngModelChange)="onFilterChange()" type="text" placeholder="Ej. embutidora, tumbler, carragenina..." class="vm-input">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select [(ngModel)]="selectedCategory" (ngModelChange)="onFilterChange()" class="vm-input">
                    <option value="all">Todas</option>
                    @for (category of categories; track category) {
                      <option [value]="category">{{ category }}</option>
                    }
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Subcategoría</label>
                  <select [(ngModel)]="selectedSubcategory" (ngModelChange)="onFilterChange()" class="vm-input">
                    <option value="all">Todas</option>
                    @for (subcategory of subcategories; track subcategory) {
                      <option [value]="subcategory">{{ subcategory }}</option>
                    }
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                  <select [(ngModel)]="selectedBrand" (ngModelChange)="onFilterChange()" class="vm-input">
                    <option value="all">Todas</option>
                    @for (brand of brands; track brand) {
                      <option [value]="brand">{{ brand }}</option>
                    }
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Origen</label>
                  <select [(ngModel)]="selectedOrigin" (ngModelChange)="onFilterChange()" class="vm-input">
                    <option value="all">Todos</option>
                    @for (origin of origins; track origin) {
                      <option [value]="origin">{{ origin }}</option>
                    }
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Condición</label>
                  <select [(ngModel)]="selectedCondition" (ngModelChange)="onFilterChange()" class="vm-input">
                    <option value="all">Todas</option>
                    <option value="Nueva">Nueva</option>
                    <option value="Usada">Usada</option>
                  </select>
                </div>
                <div>
                  <label class="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input [(ngModel)]="onlyAvailable" (ngModelChange)="onFilterChange()" type="checkbox" class="w-4 h-4 accent-vm-red">
                    Solo disponibles
                  </label>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Ordenar</label>
                  <select [(ngModel)]="sortBy" (ngModelChange)="onFilterChange()" class="vm-input">
                    <option value="name-asc">Nombre A-Z</option>
                    <option value="name-desc">Nombre Z-A</option>
                  </select>
                </div>

                <button type="button" (click)="clearFilters()" class="w-full vm-btn-secondary px-4 py-2">Limpiar filtros</button>
              </div>
            </div>
          </aside>

          <div class="lg:col-span-8 xl:col-span-9">
            <div class="flex items-center justify-between mb-5">
              <p class="text-gray-600">{{ filteredProducts.length }} productos encontrados</p>
              <p class="text-sm text-gray-500">Página {{ currentPage }} de {{ totalPages }}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              @for (product of paginatedProducts; track product.id) {
                <article class="vm-card overflow-hidden">
                  <div class="h-52 bg-gray-100 overflow-hidden">
                    <img [src]="product.image" [alt]="product.title" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                  </div>
                  <div class="p-5">
                    <div class="flex flex-wrap gap-2 mb-3">
                      <span class="text-xs font-semibold uppercase tracking-wide text-vm-red bg-vm-red/10 px-2 py-1 rounded-full">{{ product.category }}</span>
                      <span class="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{{ product.brand }}</span>
                      <span class="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{{ product.origin }}</span>
                    </div>

                    <h3 class="font-bold text-lg text-black mb-1">{{ product.title }}</h3>
                    <p class="text-sm text-gray-500 mb-3">{{ product.subcategory }} · {{ product.condition }}</p>
                    <p class="text-sm text-gray-600 mb-4">{{ product.description }}</p>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 text-xs">
                      <div class="bg-gray-50 rounded-md p-2" [class.opacity-50]="!product.capacity">
                        <p class="text-gray-500">Capacidad</p>
                        <p class="font-semibold text-black">{{ product.capacity || 'N/D' }}</p>
                      </div>
                      <div class="bg-gray-50 rounded-md p-2" [class.opacity-50]="!product.voltage">
                        <p class="text-gray-500">Voltaje</p>
                        <p class="font-semibold text-black">{{ product.voltage || 'N/D' }}</p>
                      </div>
                      <div class="bg-gray-50 rounded-md p-2" [class.opacity-50]="!product.power">
                        <p class="text-gray-500">Potencia</p>
                        <p class="font-semibold text-black">{{ product.power || 'N/D' }}</p>
                      </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <a [routerLink]="['/catalogo', product.slug]" class="vm-btn-secondary py-2 inline-flex items-center justify-center gap-2">
                        <mat-icon class="text-base">visibility</mat-icon>
                        Ver ficha
                      </a>
                      <a [href]="getQuoteLink(product)" target="_blank" class="vm-btn-outline-red py-2 inline-flex items-center justify-center gap-2">
                        <mat-icon class="text-base">chat</mat-icon>
                        Cotizar
                      </a>
                    </div>
                  </div>
                </article>
              }
            </div>

            @if (filteredProducts.length === 0) {
              <div class="mt-6 rounded-xl border border-gray-200 bg-white px-6 py-8 text-center">
                <h3 class="text-lg font-semibold text-black">No hay productos para mostrar</h3>
                <p class="mt-2 text-sm text-gray-600">Ajusta tus filtros o vuelve a intentar en unos minutos.</p>
              </div>
            }

            @if (filteredProducts.length > pageSize) {
              <div class="mt-10 flex flex-wrap items-center justify-center gap-2">
                <button type="button" (click)="prevPage()" [disabled]="currentPage === 1" class="px-4 py-2 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-vm-red">Anterior</button>
                @for (page of pageNumbers; track page) {
                  <button type="button" (click)="goToPage(page)" class="w-10 h-10 rounded border text-sm" [class.border-vm-red]="currentPage === page" [class.text-vm-red]="currentPage === page" [class.border-gray-300]="currentPage !== page" [class.text-gray-700]="currentPage !== page">{{ page }}</button>
                }
                <button type="button" (click)="nextPage()" [disabled]="currentPage === totalPages" class="px-4 py-2 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-vm-red">Siguiente</button>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CatalogComponent implements OnInit {
  constructor(
    private readonly seoService: SeoService,
    private readonly route: ActivatedRoute,
    private readonly catalogApi: CatalogApiService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.seoService.setMeta({
      title: 'Catálogo de Maquinaria | VM Food Import',
      description:
        'Explora el catálogo completo de VM Food Import: maquinaria alemana, maquinaria industrial china, equipamiento complementario y materias primas no cárnicas.',
      keywords:
        'catálogo VM Food Import, embutidoras Handtmann, maquinaria china alimentos, equipos industriales Venezuela',
      url: 'https://vmfoodimport.com/catalogo',
      image: 'https://picsum.photos/seed/vmfood-catalog-og/1200/630',
    });
  }

  searchTerm = '';
  selectedCategory = 'all';
  selectedSubcategory = 'all';
  selectedBrand = 'all';
  selectedOrigin = 'all';
  selectedCondition: 'all' | 'Nueva' | 'Usada' = 'all';
  sortBy: 'name-asc' | 'name-desc' = 'name-asc';
  onlyAvailable = false;

  products: CatalogProduct[] = environment.production ? [] : this.withSlug(CATALOG_PRODUCTS);
  loadError = false;
  readonly pageSize = 6;
  currentPage = 1;

  ngOnInit(): void {
    this.loadProducts();

    this.route.queryParamMap.subscribe((params) => {
      const categoryFromUrl = params.get('categoria')?.trim();

      if (categoryFromUrl && this.categories.includes(categoryFromUrl)) {
        this.selectedCategory = categoryFromUrl;
        this.selectedSubcategory = 'all';
        this.currentPage = 1;
      }
    });
  }

  get categories(): string[] {
    return [...new Set(this.products.map((product) => product.category))];
  }

  get subcategories(): string[] {
    const base = this.selectedCategory === 'all' ? this.products : this.products.filter((product) => product.category === this.selectedCategory);
    return [...new Set(base.map((product) => product.subcategory))];
  }

  get brands(): string[] {
    return [...new Set(this.products.map((product) => product.brand))];
  }

  get origins(): string[] {
    return [...new Set(this.products.map((product) => product.origin))];
  }

  get filteredProducts(): CatalogProduct[] {
    let result = this.products.filter((product) => {
      const search = this.searchTerm.toLowerCase().trim();
      const matchesSearch =
        search.length === 0 ||
        product.title.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.tags.some((tag) => tag.toLowerCase().includes(search));

      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      const matchesSubcategory = this.selectedSubcategory === 'all' || product.subcategory === this.selectedSubcategory;
      const matchesBrand = this.selectedBrand === 'all' || product.brand === this.selectedBrand;
      const matchesOrigin = this.selectedOrigin === 'all' || product.origin === this.selectedOrigin;
      const matchesCondition = this.selectedCondition === 'all' || product.condition === this.selectedCondition;
      const matchesAvailability = !this.onlyAvailable || product.available;

      return matchesSearch && matchesCategory && matchesSubcategory && matchesBrand && matchesOrigin && matchesCondition && matchesAvailability;
    });

    result = [...result].sort((a, b) => {
      if (this.sortBy === 'name-desc') {
        return b.title.localeCompare(a.title);
      }
      return a.title.localeCompare(b.title);
    });

    return result;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredProducts.length / this.pageSize));
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paginatedProducts(): CatalogProduct[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  onFilterChange(): void {
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  getQuoteLink(product: CatalogProduct): string {
    const message = encodeURIComponent(`Hola VM Food Import, deseo cotizar el equipo: ${product.title} (${product.brand}). Categoría: ${product.category}.`);
    return `https://wa.me/584120000000?text=${message}`;
  }

  private loadProducts(): void {
    this.loadError = false;

    this.catalogApi.getProducts({ perPage: 100 }).subscribe({
      next: (response) => {
        this.products = response.data.map((item) => this.mapProduct(item));
        this.cdr.markForCheck();
      },
      error: () => {
        this.loadError = true;
        this.products = environment.production ? [] : this.withSlug(CATALOG_PRODUCTS);
        this.cdr.markForCheck();
      },
    });
  }

  private mapProduct(item: CatalogProductDto): CatalogProduct {
    return {
      id: item.id,
      slug: this.toSlug(item.slug || item.title),
      title: item.title,
      category: item.category ?? 'Sin categoría',
      subcategory: item.subcategory ?? item.category ?? 'General',
      brand: item.brand ?? 'Sin marca',
      origin: item.origin ?? 'N/D',
      condition: item.condition,
      description: item.description ?? item.short_description ?? '',
      image: this.resolveImageUrl(item.image),
      available: item.available,
      capacity: item.capacity ?? undefined,
      voltage: item.voltage ?? undefined,
      power: item.power ?? undefined,
      tags: item.tags ?? [],
    };
  }

  private withSlug(products: CatalogProduct[]): CatalogProduct[] {
    return products.map((product) => ({
      ...product,
      slug: this.toSlug(product.slug || product.title),
    }));
  }

  private toSlug(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private resolveImageUrl(image: string | null): string {
    if (!image) {
      return '/images/banners/bannerFilter.jpg';
    }

    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }

    const base = environment.backendBaseUrl.replace(/\/$/, '');
    const path = image.startsWith('/') ? image : `/${image}`;
    return `${base}${path}`;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.selectedSubcategory = 'all';
    this.selectedBrand = 'all';
    this.selectedOrigin = 'all';
    this.selectedCondition = 'all';
    this.sortBy = 'name-asc';
    this.onlyAvailable = false;
    this.currentPage = 1;
  }
}
