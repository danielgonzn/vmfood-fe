import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CATALOG_PRODUCTS } from './catalog.data';
import { CatalogProduct } from './catalog.models';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-catalog-detail',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="min-h-screen bg-gray-50 pt-24">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button routerLink="/catalogo" class="inline-flex items-center gap-2 text-gray-700 hover:text-vm-red font-medium mb-6">
          <mat-icon>arrow_back</mat-icon>
          Volver al catálogo
        </button>

        @if (product) {
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div class="bg-gray-100">
                <div class="relative min-h-[300px]">
                  <img [src]="galleryImages[currentImageIndex]" [alt]="product.title" class="w-full h-full object-cover" referrerpolicy="no-referrer">

                  <button
                    type="button"
                    (click)="prevImage()"
                    class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center shadow"
                    aria-label="Imagen anterior"
                  >
                    <mat-icon>chevron_left</mat-icon>
                  </button>

                  <button
                    type="button"
                    (click)="nextImage()"
                    class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-9 h-9 flex items-center justify-center shadow"
                    aria-label="Siguiente imagen"
                  >
                    <mat-icon>chevron_right</mat-icon>
                  </button>
                </div>

                <div class="grid grid-cols-3 gap-2 p-3 bg-white border-t border-gray-100">
                  @for (image of galleryImages; track image; let i = $index) {
                    <button
                      type="button"
                      (click)="selectImage(i)"
                      class="h-20 rounded overflow-hidden border"
                      [class.border-vm-red]="currentImageIndex === i"
                      [class.border-gray-200]="currentImageIndex !== i"
                    >
                      <img [src]="image" [alt]="product.title + ' vista ' + (i + 1)" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                    </button>
                  }
                </div>
              </div>

              <div class="p-6 md:p-8">
                <div class="flex flex-wrap gap-2 mb-3">
                  <span class="text-xs font-semibold uppercase tracking-wide text-vm-red bg-vm-red/10 px-2 py-1 rounded-full">{{ product.category }}</span>
                  <span class="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{{ product.subcategory }}</span>
                  <span class="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{{ product.brand }}</span>
                </div>

                <h1 class="text-2xl md:text-3xl font-bold text-black mb-2">{{ product.title }}</h1>
                <p class="text-gray-600 mb-6">{{ product.description }}</p>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm">
                  <div class="bg-gray-50 rounded-lg p-3">
                    <p class="text-gray-500">Origen</p>
                    <p class="font-semibold text-black">{{ product.origin }}</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-3">
                    <p class="text-gray-500">Condición</p>
                    <p class="font-semibold text-black">{{ product.condition }}</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-3" [class.opacity-50]="!product.capacity">
                    <p class="text-gray-500">Capacidad</p>
                    <p class="font-semibold text-black">{{ product.capacity || 'No especificada' }}</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-3" [class.opacity-50]="!product.voltage">
                    <p class="text-gray-500">Voltaje</p>
                    <p class="font-semibold text-black">{{ product.voltage || 'No especificado' }}</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-3" [class.opacity-50]="!product.power">
                    <p class="text-gray-500">Potencia</p>
                    <p class="font-semibold text-black">{{ product.power || 'No especificada' }}</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-3">
                    <p class="text-gray-500">Disponibilidad</p>
                    <p class="font-semibold" [class.text-green-700]="product.available" [class.text-gray-600]="!product.available">
                      {{ product.available ? 'Disponible' : 'Bajo pedido' }}
                    </p>
                  </div>
                </div>

                <a
                  [href]="getQuoteLink(product)"
                  target="_blank"
                  class="w-full sm:w-auto border border-vm-red text-vm-red font-medium py-2.5 px-5 rounded hover:bg-vm-red hover:text-white transition-colors inline-flex items-center justify-center gap-2"
                >
                  <mat-icon class="text-base">chat</mat-icon>
                  Solicitar cotización
                </a>
              </div>
            </div>
          </div>

          @if (relatedProducts.length > 0) {
            <div class="mt-10">
              <h2 class="text-2xl font-bold text-black mb-4">Productos relacionados</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                @for (item of relatedProducts; track item.id) {
                  <article class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                    <div class="h-40 bg-gray-100">
                      <img [src]="item.image" [alt]="item.title" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                    </div>
                    <div class="p-4">
                      <p class="text-xs font-semibold uppercase tracking-wide text-vm-red mb-1">{{ item.brand }}</p>
                      <h3 class="font-bold text-black mb-3">{{ item.title }}</h3>
                      <a [routerLink]="['/catalogo', item.id]" class="text-sm font-medium text-vm-red hover:underline">Ver ficha</a>
                    </div>
                  </article>
                }
              </div>
            </div>
          }
        } @else {
          <div class="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <h2 class="text-xl font-bold text-black mb-2">Producto no encontrado</h2>
            <p class="text-gray-600 mb-4">No encontramos la ficha solicitada en el catálogo actual.</p>
            <a routerLink="/catalogo" class="text-vm-red font-semibold hover:underline">Volver al catálogo</a>
          </div>
        }
      </div>
    </section>
  `,
})
export class CatalogDetailComponent {
  readonly product: CatalogProduct | undefined;
  readonly galleryImages: string[];
  currentImageIndex = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly seoService: SeoService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = CATALOG_PRODUCTS.find((item) => item.id === id);
    this.galleryImages = this.product ? this.buildGalleryImages(this.product) : [];

    if (this.product) {
      this.seoService.setMeta({
        title: `${this.product.title} | VM Food Import`,
        description: `${this.product.description} Marca: ${this.product.brand}. Categoría: ${this.product.category}.`,
        keywords: `${this.product.title}, ${this.product.brand}, ${this.product.category}, VM Food Import`,
        url: `https://vmfoodimport.com/catalogo/${this.product.id}`,
        image: this.product.image,
      });

      this.seoService.setJsonLd('vmfood-product-schema', {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: this.product.title,
        description: this.product.description,
        image: this.product.image,
        brand: {
          '@type': 'Brand',
          name: this.product.brand,
        },
        offers: {
          '@type': 'Offer',
          availability: this.product.available
            ? 'https://schema.org/InStock'
            : 'https://schema.org/PreOrder',
          priceCurrency: 'USD',
          price: '0',
          url: `https://vmfoodimport.com/catalogo/${this.product.id}`,
        },
      });
    }
  }

  get relatedProducts(): CatalogProduct[] {
    if (!this.product) {
      return [];
    }

    return CATALOG_PRODUCTS
      .filter((item) => item.category === this.product?.category && item.id !== this.product?.id)
      .slice(0, 3);
  }

  selectImage(index: number): void {
    if (index < 0 || index >= this.galleryImages.length) {
      return;
    }
    this.currentImageIndex = index;
  }

  nextImage(): void {
    if (this.galleryImages.length === 0) {
      return;
    }
    this.currentImageIndex = (this.currentImageIndex + 1) % this.galleryImages.length;
  }

  prevImage(): void {
    if (this.galleryImages.length === 0) {
      return;
    }
    this.currentImageIndex = (this.currentImageIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
  }

  getQuoteLink(product: CatalogProduct): string {
    const message = encodeURIComponent(
      `Hola VM Food Import, deseo cotizar el equipo: ${product.title} (${product.brand}). Categoría: ${product.category}.`
    );
    return `https://wa.me/584120000000?text=${message}`;
  }

  private buildGalleryImages(product: CatalogProduct): string[] {
    return [
      product.image,
      `https://picsum.photos/seed/${product.id}-gallery-1/1000/700`,
      `https://picsum.photos/seed/${product.id}-gallery-2/1000/700`,
    ];
  }
}
