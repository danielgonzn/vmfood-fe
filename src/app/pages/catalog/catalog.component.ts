import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CATALOG_PRODUCTS } from './catalog.data';
import { CatalogProduct } from './catalog.models';
import { SeoService } from '../../shared/services/seo.service';
import { CatalogApiService } from '../../core/services/catalog-api.service';
import { BrandDto, CatalogProductDto, CategoryDto } from '../../core/models/api.models';
import { environment } from '../../../environments/environment';
import { forkJoin } from 'rxjs';

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
              <h1 class="text-3xl md:text-5xl font-extrabold leading-tight mb-3">Catálogo de maquinarias nuevas y usadas</h1>
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

        <section class="md:hidden sticky top-20 z-20 mb-4 rounded-2xl border border-gray-200 bg-white/95 backdrop-blur shadow-sm p-3">
          <button type="button" (click)="openMobileFilters()" class="vm-btn-secondary py-2 w-full inline-flex items-center justify-center gap-2">
            <mat-icon class="text-base">tune</mat-icon>
            Filtrar
          </button>

          <div class="mt-2 flex items-center justify-between gap-2 text-xs text-gray-600">
            <span>{{ activeFilterCount }} filtro(s) activos</span>
            @if (activeFilterCount > 0) {
              <button type="button" (click)="clearFilters()" class="font-semibold text-vm-red">Limpiar</button>
            }
          </div>
        </section>

        <div class="space-y-6">
          <section class="bg-white border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm">
            <div class="hidden md:flex md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h2 class="text-lg font-bold text-black">Filtra más rápido</h2>
                <p class="text-sm text-gray-500">Selecciona una categoría y ajusta detalles en segundos.</p>
              </div>
              <button type="button" (click)="clearFilters()" class="vm-btn-secondary px-4 py-2 w-full md:w-auto">Limpiar filtros</button>
            </div>

            <div class="hidden md:block mt-4 overflow-x-auto pb-1">
              <div class="flex items-center gap-2 min-w-max pr-2">
                <button
                  type="button"
                  (click)="selectCategory('all')"
                  class="px-4 py-2 rounded-full text-sm font-semibold border transition-colors"
                  [class.bg-vm-red]="selectedCategory === 'all'"
                  [class.text-white]="selectedCategory === 'all'"
                  [class.border-vm-red]="selectedCategory === 'all'"
                  [class.bg-white]="selectedCategory !== 'all'"
                  [class.text-gray-700]="selectedCategory !== 'all'"
                  [class.border-gray-300]="selectedCategory !== 'all'"
                >
                  Todas
                </button>

                @for (category of categories; track category.slug) {
                  <button
                    type="button"
                    (click)="selectCategory(category.slug)"
                    class="px-4 py-2 rounded-full text-sm font-semibold border transition-colors"
                    [class.bg-vm-red]="selectedCategory === category.slug"
                    [class.text-white]="selectedCategory === category.slug"
                    [class.border-vm-red]="selectedCategory === category.slug"
                    [class.bg-white]="selectedCategory !== category.slug"
                    [class.text-gray-700]="selectedCategory !== category.slug"
                    [class.border-gray-300]="selectedCategory !== category.slug"
                  >
                    {{ category.name }}
                  </button>
                }
              </div>
            </div>

            <div class="hidden md:grid mt-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                <input [(ngModel)]="searchTerm" (ngModelChange)="onFilterChange()" type="text" placeholder="Ej. embutidora, tumbler, carragenina..." class="vm-input">
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
                  @for (brand of brands; track brand.slug) {
                    <option [value]="brand.slug">{{ brand.name }}</option>
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
            </div>

            <div class="hidden md:flex mt-3 flex-wrap items-center justify-end gap-3">
              @if (activeFilterCount > 0) {
                <p class="text-xs md:text-sm text-gray-500">{{ activeFilterCount }} filtro(s) activos</p>
              }
            </div>

            <div class="md:hidden">
              @if (activeFilterCount > 0) {
                <div class="mt-3 flex flex-wrap gap-2">
                  @if (searchTerm.trim().length > 0) {
                    <button type="button" (click)="searchTerm = ''; onFilterChange()" class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-vm-red/10 text-vm-red text-xs font-semibold">
                      Búsqueda
                      <mat-icon class="text-sm">close</mat-icon>
                    </button>
                  }
                  @if (selectedCategory !== 'all') {
                    <button type="button" (click)="selectedCategory = 'all'; selectedSubcategory = 'all'; onFilterChange()" class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-vm-red/10 text-vm-red text-xs font-semibold">
                      {{ getSelectedCategoryLabel() }}
                      <mat-icon class="text-sm">close</mat-icon>
                    </button>
                  }
                  @if (selectedSubcategory !== 'all') {
                    <button type="button" (click)="selectedSubcategory = 'all'; onFilterChange()" class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-vm-red/10 text-vm-red text-xs font-semibold">
                      {{ selectedSubcategory }}
                      <mat-icon class="text-sm">close</mat-icon>
                    </button>
                  }
                  @if (selectedBrand !== 'all') {
                    <button type="button" (click)="selectedBrand = 'all'; onFilterChange()" class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-vm-red/10 text-vm-red text-xs font-semibold">
                      {{ getSelectedBrandLabel() }}
                      <mat-icon class="text-sm">close</mat-icon>
                    </button>
                  }
                  @if (selectedCondition !== 'all') {
                    <button type="button" (click)="selectedCondition = 'all'; onFilterChange()" class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-vm-red/10 text-vm-red text-xs font-semibold">
                      {{ selectedCondition }}
                      <mat-icon class="text-sm">close</mat-icon>
                    </button>
                  }
                </div>
              }
            </div>
          </section>

          @if (mobileFiltersOpen) {
            <div class="md:hidden fixed inset-0 z-50 mb-0">
              <button type="button" aria-label="Cerrar filtros" (click)="closeMobileFilters()" class="absolute inset-0 bg-black/45"></button>

              <section class="absolute inset-x-0 bottom-0 rounded-t-3xl bg-white shadow-2xl max-h-[88vh] overflow-hidden">
                <div class="px-4 pt-4 pb-3 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-bold text-black">Filtrar catálogo</h3>
                    <p class="text-xs text-gray-500">Ajusta los criterios y aplica cambios.</p>
                  </div>
                  <button type="button" (click)="closeMobileFilters()" class="w-10 h-10 rounded-full border border-gray-200 inline-flex items-center justify-center text-gray-600">
                    <mat-icon>close</mat-icon>
                  </button>
                </div>

                <div class="p-4 space-y-4 overflow-y-auto max-h-[calc(88vh-132px)]">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                    <input [(ngModel)]="mobileSearchTerm" type="text" placeholder="Ej. embutidora, tumbler, carragenina..." class="vm-input">
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select [(ngModel)]="mobileSelectedCategory" (ngModelChange)="onMobileCategoryChange()" class="vm-input">
                      <option value="all">Todas</option>
                      @for (category of categories; track category.slug) {
                        <option [value]="category.slug">{{ category.name }}</option>
                      }
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Subcategoría</label>
                    <select [(ngModel)]="mobileSelectedSubcategory" class="vm-input">
                      <option value="all">Todas</option>
                      @for (subcategory of mobileSubcategories; track subcategory) {
                        <option [value]="subcategory">{{ subcategory }}</option>
                      }
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Marca</label>
                    <select [(ngModel)]="mobileSelectedBrand" class="vm-input">
                      <option value="all">Todas</option>
                      @for (brand of brands; track brand.slug) {
                        <option [value]="brand.slug">{{ brand.name }}</option>
                      }
                    </select>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Condición</label>
                    <select [(ngModel)]="mobileSelectedCondition" class="vm-input">
                      <option value="all">Todas</option>
                      <option value="Nueva">Nueva</option>
                      <option value="Usada">Usada</option>
                    </select>
                  </div>

                </div>

                <div class="px-4 py-3 border-t border-gray-200 bg-white grid grid-cols-2 gap-3">
                  <button type="button" (click)="clearMobileDraftFilters()" class="vm-btn-secondary py-2">Limpiar</button>
                  <button type="button" (click)="applyMobileFilters()" class="vm-btn-primary py-2">Aplicar</button>
                </div>
              </section>
            </div>
          }

          <div>
            <div class="flex items-center justify-between mb-5">
              <p class="text-gray-600">{{ totalProducts }} productos encontrados</p>
              <p class="text-sm text-gray-500">Página {{ currentPage }} de {{ totalPages }}</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              @for (product of products; track product.id) {
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

            @if (products.length === 0) {
              <div class="mt-6 rounded-xl border border-gray-200 bg-white px-6 py-8 text-center">
                <h3 class="text-lg font-semibold text-black">No hay productos para mostrar</h3>
                <p class="mt-2 text-sm text-gray-600">Ajusta tus filtros o vuelve a intentar en unos minutos.</p>
              </div>
            }

            @if (totalPages > 1) {
              <div class="mt-10 flex flex-wrap items-center justify-center gap-2">
                <button type="button" (click)="prevPage()" [disabled]="currentPage === 1" class="px-4 py-2 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-vm-red">Anterior</button>
                @for (page of pageNumbers; track page) {
                  <button type="button" (click)="goToPage(page)" class="w-10 h-10 rounded border text-sm" [class.border-vm-red]="currentPage === page" [class.text-vm-red]="currentPage === page" [class.border-gray-300]="currentPage !== page" [class.text-gray-700]="currentPage !== page">{{ page }}</button>
                }
                <button type="button" (click)="nextPage()" [disabled]="currentPage === totalPages" class="px-4 py-2 rounded border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-vm-red">Siguiente</button>
              </div>
            }

            <section class="mt-14 bg-black text-white rounded-3xl p-7 md:p-8 grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
              <div>
                <p class="text-vm-red font-bold tracking-widest uppercase text-xs mb-2">Asesoría Exprés</p>
                <h2 class="text-2xl md:text-3xl font-bold mb-3">¿No sabes qué equipo elegir?</h2>
                <p class="text-gray-300 mb-4">Cuéntanos el perfil de tu operación y nuestro equipo te orienta con una ruta técnica y comercial por WhatsApp.</p>
                <p class="text-sm text-gray-400">Perfil seleccionado: {{ advisorSummary }}</p>
              </div>

              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-gray-200 mb-1">Tipo de operación</label>
                  <select [(ngModel)]="advisorIndustry" class="vm-input bg-white text-black">
                    <option value="embutidos">Embutidos y cárnicos</option>
                    <option value="panaderia">Panadería y alimentos horneados</option>
                    <option value="alimentos">Alimentos procesados en general</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-200 mb-1">Nivel de producción</label>
                  <select [(ngModel)]="advisorVolume" class="vm-input bg-white text-black">
                    <option value="inicial">Inicial</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-200 mb-1">Rango de inversión</label>
                  <select [(ngModel)]="advisorBudget" class="vm-input bg-white text-black">
                    <option value="base">Base</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <button type="button" (click)="startAdvisorWhatsApp()" class="w-full vm-btn-primary px-6 py-3">
                  Recibir orientación por WhatsApp
                </button>
              </div>
            </section>
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
      image: 'https://vmfoodimport.com/images/banners/bannerFilter.jpg',
    });
  }

  readonly whatsappDial = '584127212203';

  searchTerm = '';
  advisorIndustry = 'embutidos';
  advisorVolume = 'media';
  advisorBudget = 'intermedio';
  selectedCategory = 'all';
  selectedSubcategory = 'all';
  selectedBrand = 'all';
  selectedOrigin = 'all';
  selectedCondition: 'all' | 'Nueva' | 'Usada' = 'all';
  mobileFiltersOpen = false;

  mobileSearchTerm = '';
  mobileSelectedCategory = 'all';
  mobileSelectedSubcategory = 'all';
  mobileSelectedBrand = 'all';
  mobileSelectedCondition: 'all' | 'Nueva' | 'Usada' = 'all';

  categories: CategoryDto[] = [];
  brands: BrandDto[] = [];
  products: CatalogProduct[] = environment.production ? [] : this.withSlug(CATALOG_PRODUCTS);
  loadError = false;
  totalProducts = 0;
  totalPages = 1;
  readonly pageSize = 12;
  currentPage = 1;

  ngOnInit(): void {
    this.loadTaxonomies();

    this.route.queryParamMap.subscribe((params) => {
      const categoryFromUrl = params.get('categoria')?.trim();

      if (categoryFromUrl) {
        this.selectedCategory = categoryFromUrl;
      } else {
        this.selectedCategory = 'all';
      }

      this.selectedSubcategory = 'all';
      this.currentPage = 1;
      this.loadProducts();
    });
  }

  get subcategories(): string[] {
    if (this.selectedCategory === 'all') {
      return this.categories.map((category) => category.name);
    }

    const categoryName = this.getCategoryNameByValue(this.selectedCategory);
    return categoryName ? [categoryName] : [];
  }

  get mobileSubcategories(): string[] {
    if (this.mobileSelectedCategory === 'all') {
      return this.categories.map((category) => category.name);
    }

    const categoryName = this.getCategoryNameByValue(this.mobileSelectedCategory);
    return categoryName ? [categoryName] : [];
  }

  get origins(): string[] {
    return [...new Set(this.products.map((product) => product.origin))];
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get advisorSummary(): string {
    const industryMap: Record<string, string> = {
      embutidos: 'procesamiento de embutidos',
      panaderia: 'produccion de panaderia',
      alimentos: 'lineas de alimentos procesados',
    };

    const volumeMap: Record<string, string> = {
      inicial: 'arranque de linea',
      media: 'expansion de capacidad media',
      alta: 'operacion de alto volumen',
    };

    const budgetMap: Record<string, string> = {
      base: 'presupuesto de entrada',
      intermedio: 'presupuesto intermedio',
      premium: 'presupuesto premium',
    };

    return `${industryMap[this.advisorIndustry]} · ${volumeMap[this.advisorVolume]} · ${budgetMap[this.advisorBudget]}`;
  }

  get activeFilterCount(): number {
    let count = 0;

    if (this.searchTerm.trim().length > 0) {
      count += 1;
    }
    if (this.selectedCategory !== 'all') {
      count += 1;
    }
    if (this.selectedSubcategory !== 'all') {
      count += 1;
    }
    if (this.selectedBrand !== 'all') {
      count += 1;
    }
    if (this.selectedOrigin !== 'all') {
      count += 1;
    }
    if (this.selectedCondition !== 'all') {
      count += 1;
    }
    return count;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;

    if (this.selectedSubcategory !== 'all' && !this.subcategories.includes(this.selectedSubcategory)) {
      this.selectedSubcategory = 'all';
    }

    this.onFilterChange();
  }

  getSelectedCategoryLabel(): string {
    if (this.selectedCategory === 'all') {
      return 'Todas';
    }

    return this.getCategoryNameByValue(this.selectedCategory) ?? this.selectedCategory;
  }

  getSelectedBrandLabel(): string {
    if (this.selectedBrand === 'all') {
      return 'Todas';
    }

    const bySlug = this.brands.find((brand) => brand.slug === this.selectedBrand);
    if (bySlug) {
      return bySlug.name;
    }

    const byName = this.brands.find((brand) => brand.name.toLowerCase() === this.selectedBrand.toLowerCase());
    return byName ? byName.name : this.selectedBrand;
  }

  openMobileFilters(): void {
    this.mobileSearchTerm = this.searchTerm;
    this.mobileSelectedCategory = this.selectedCategory;
    this.mobileSelectedSubcategory = this.selectedSubcategory;
    this.mobileSelectedBrand = this.selectedBrand;
    this.mobileSelectedCondition = this.selectedCondition;

    this.mobileFiltersOpen = true;

    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeMobileFilters(): void {
    this.mobileFiltersOpen = false;

    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  onMobileCategoryChange(): void {
    if (this.mobileSelectedSubcategory !== 'all' && !this.mobileSubcategories.includes(this.mobileSelectedSubcategory)) {
      this.mobileSelectedSubcategory = 'all';
    }
  }

  clearMobileDraftFilters(): void {
    this.mobileSearchTerm = '';
    this.mobileSelectedCategory = 'all';
    this.mobileSelectedSubcategory = 'all';
    this.mobileSelectedBrand = 'all';
    this.mobileSelectedCondition = 'all';
  }

  applyMobileFilters(): void {
    this.searchTerm = this.mobileSearchTerm;
    this.selectedCategory = this.mobileSelectedCategory;
    this.selectedSubcategory = this.mobileSelectedSubcategory;
    this.selectedBrand = this.mobileSelectedBrand;
    this.selectedCondition = this.mobileSelectedCondition;

    this.onFilterChange();
    this.closeMobileFilters();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadProducts();
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;
    this.loadProducts();
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  getQuoteLink(product: CatalogProduct): string {
    const message = encodeURIComponent(`Hola VM Food Import, deseo cotizar el equipo: ${product.title} (${product.brand}). Categoría: ${product.category}.`);
    return `https://wa.me/${this.whatsappDial}?text=${message}`;
  }

  startAdvisorWhatsApp(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const message = encodeURIComponent(
      `Hola VM Food Import, deseo una recomendacion de equipos para ${this.advisorSummary}.`
    );

    window.open(`https://wa.me/${this.whatsappDial}?text=${message}`, '_blank', 'noopener');
  }

  private loadTaxonomies(): void {
    forkJoin({
      categories: this.catalogApi.getCategories(),
      brands: this.catalogApi.getBrands(),
    }).subscribe({
      next: ({ categories, brands }) => {
        this.categories = categories.data;
        this.brands = brands.data;
        this.normalizeSelectedTaxonomies();
        this.cdr.markForCheck();
      },
      error: () => {
        this.categories = [];
        this.brands = [];
        this.cdr.markForCheck();
      },
    });
  }

  private loadProducts(): void {
    this.loadError = false;

    this.catalogApi
      .getProducts({
        search: this.searchTerm.trim() || undefined,
        category: this.selectedCategory !== 'all' ? this.selectedCategory : undefined,
        subcategory: this.selectedSubcategory !== 'all' ? this.selectedSubcategory : undefined,
        brand: this.selectedBrand !== 'all' ? this.selectedBrand : undefined,
        origin: this.selectedOrigin !== 'all' ? this.selectedOrigin : undefined,
        condition: this.selectedCondition,
        perPage: this.pageSize,
        page: this.currentPage,
      })
      .subscribe({
      next: (response) => {
        this.products = response.data.map((item) => this.mapProduct(item));
        this.totalProducts = response.meta?.total ?? this.products.length;
        this.totalPages = Math.max(1, response.meta?.last_page ?? 1);
        this.currentPage = response.meta?.current_page ?? this.currentPage;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loadError = true;

        const fallback = environment.production ? [] : this.withSlug(CATALOG_PRODUCTS);
        this.totalProducts = fallback.length;
        this.totalPages = Math.max(1, Math.ceil(this.totalProducts / this.pageSize));

        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }

        const start = (this.currentPage - 1) * this.pageSize;
        this.products = fallback.slice(start, start + this.pageSize);
        this.cdr.markForCheck();
      },
    });
  }

  private normalizeSelectedTaxonomies(): void {
    this.selectedCategory = this.normalizeCategoryValue(this.selectedCategory);
    this.mobileSelectedCategory = this.normalizeCategoryValue(this.mobileSelectedCategory);
    this.selectedBrand = this.normalizeBrandValue(this.selectedBrand);
    this.mobileSelectedBrand = this.normalizeBrandValue(this.mobileSelectedBrand);

    if (this.selectedSubcategory !== 'all' && !this.subcategories.includes(this.selectedSubcategory)) {
      this.selectedSubcategory = 'all';
    }

    if (this.mobileSelectedSubcategory !== 'all' && !this.mobileSubcategories.includes(this.mobileSelectedSubcategory)) {
      this.mobileSelectedSubcategory = 'all';
    }
  }

  private normalizeCategoryValue(value: string): string {
    if (value === 'all' || this.categories.length === 0) {
      return value;
    }

    const bySlug = this.categories.find((category) => category.slug === value);
    if (bySlug) {
      return bySlug.slug;
    }

    const byName = this.categories.find((category) => category.name.toLowerCase() === value.toLowerCase());
    return byName ? byName.slug : value;
  }

  private normalizeBrandValue(value: string): string {
    if (value === 'all' || this.brands.length === 0) {
      return value;
    }

    const bySlug = this.brands.find((brand) => brand.slug === value);
    if (bySlug) {
      return bySlug.slug;
    }

    const byName = this.brands.find((brand) => brand.name.toLowerCase() === value.toLowerCase());
    return byName ? byName.slug : value;
  }

  private getCategoryNameByValue(value: string): string | null {
    const bySlug = this.categories.find((category) => category.slug === value);
    if (bySlug) {
      return bySlug.name;
    }

    const byName = this.categories.find((category) => category.name.toLowerCase() === value.toLowerCase());
    return byName ? byName.name : null;
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
    this.onFilterChange();
  }
}
