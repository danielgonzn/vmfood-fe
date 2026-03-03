import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

interface CatalogProduct {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  available: boolean;
}

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [FormsModule, MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="min-h-screen bg-gray-50 pt-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex items-center justify-between mb-6">
          <button routerLink="/" class="inline-flex items-center gap-2 text-gray-700 hover:text-vm-red font-medium">
            <mat-icon>arrow_back</mat-icon>
            Volver al inicio
          </button>
          <h1 class="text-xl md:text-2xl font-bold text-black">Catálogo Completo</h1>
        </div>

        <div class="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 mb-8">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
              <input
                [(ngModel)]="searchTerm"
                type="text"
                placeholder="Ej. empacadora, molino, bobina..."
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-vm-red focus:ring-2 focus:ring-vm-red/20 outline-none"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                [(ngModel)]="selectedCategory"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-vm-red focus:ring-2 focus:ring-vm-red/20 outline-none bg-white"
              >
                <option value="all">Todas</option>
                @for (category of categories; track category) {
                  <option [value]="category">{{ category }}</option>
                }
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Ordenar</label>
              <select
                [(ngModel)]="sortBy"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-vm-red focus:ring-2 focus:ring-vm-red/20 outline-none bg-white"
              >
                <option value="name-asc">Nombre A-Z</option>
                <option value="name-desc">Nombre Z-A</option>
              </select>
            </div>
          </div>

          <div class="mt-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <label class="inline-flex items-center gap-2 text-sm text-gray-700">
              <input [(ngModel)]="onlyAvailable" type="checkbox" class="w-4 h-4 accent-vm-red">
              Solo disponibles
            </label>

            <button
              type="button"
              (click)="clearFilters()"
              class="sm:ml-auto border border-gray-400 text-gray-700 px-4 py-2 rounded-lg hover:border-black hover:text-black"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between mb-5">
          <p class="text-gray-600">{{ filteredProducts.length }} productos encontrados</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          @for (product of filteredProducts; track product.id) {
            <article class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div class="h-52 bg-gray-100 overflow-hidden">
                <img [src]="product.image" [alt]="product.title" class="w-full h-full object-cover" referrerpolicy="no-referrer">
              </div>
              <div class="p-5">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-semibold uppercase tracking-wide text-vm-red">{{ product.category }}</span>
                  <span
                    class="text-xs font-semibold px-2 py-1 rounded-full"
                    [class.bg-green-100]="product.available"
                    [class.text-green-700]="product.available"
                    [class.bg-gray-100]="!product.available"
                    [class.text-gray-600]="!product.available"
                  >
                    {{ product.available ? 'Disponible' : 'Bajo pedido' }}
                  </span>
                </div>
                <h3 class="font-bold text-lg text-black mb-2">{{ product.title }}</h3>
                <p class="text-sm text-gray-600 mb-4">{{ product.description }}</p>
                <button class="w-full border border-vm-red text-vm-red font-medium py-2 rounded hover:bg-vm-red hover:text-white transition-colors">
                  Solicitar cotización
                </button>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class CatalogComponent {
  searchTerm = '';
  selectedCategory = 'all';
  sortBy: 'name-asc' | 'name-desc' = 'name-asc';
  onlyAvailable = false;

  readonly products: CatalogProduct[] = [
    { id: 1, title: 'Empacadora al Vacío', category: 'Empaque', description: 'Doble campana en acero inoxidable 304 para procesos continuos.', image: 'https://picsum.photos/seed/catalog-vacuum/700/500', available: true },
    { id: 2, title: 'Mezcladora Industrial', category: 'Procesamiento', description: 'Paletas reforzadas para mezclas densas y embutidos.', image: 'https://picsum.photos/seed/catalog-mixer/700/500', available: true },
    { id: 3, title: 'Molino de Carne', category: 'Procesamiento', description: 'Cabezal #32 con motor de alto desempeño y fácil limpieza.', image: 'https://picsum.photos/seed/catalog-grinder/700/500', available: true },
    { id: 4, title: 'Bobina de Plástico', category: 'Materia Prima', description: 'Multicapa de alta barrera para empaque termoformado.', image: 'https://picsum.photos/seed/catalog-bobina/700/500', available: true },
    { id: 5, title: 'Selladora de Banda', category: 'Empaque', description: 'Sellado continuo para líneas de alta productividad.', image: 'https://picsum.photos/seed/catalog-sealer/700/500', available: true },
    { id: 6, title: 'Embutidora Hidráulica', category: 'Procesamiento', description: 'Dosificación homogénea y estructura sanitaria.', image: 'https://picsum.photos/seed/catalog-stuffer/700/500', available: false },
    { id: 7, title: 'Etiquetadora Automática', category: 'Empaque', description: 'Aplicación precisa para distintos tipos de envase.', image: 'https://picsum.photos/seed/catalog-label/700/500', available: true },
    { id: 8, title: 'Marmita Industrial', category: 'Cocción', description: 'Control de temperatura para salsas y productos viscosos.', image: 'https://picsum.photos/seed/catalog-kettle/700/500', available: false },
    { id: 9, title: 'Túnel de Termoencogido', category: 'Empaque', description: 'Acabado profesional para empaque secundario.', image: 'https://picsum.photos/seed/catalog-shrink/700/500', available: true },
    { id: 10, title: 'Báscula Multihead', category: 'Pesaje', description: 'Pesaje inteligente para minimizar mermas.', image: 'https://picsum.photos/seed/catalog-scale/700/500', available: false },
    { id: 11, title: 'Cutter Industrial', category: 'Procesamiento', description: 'Corte uniforme para líneas de preparación cárnica.', image: 'https://picsum.photos/seed/catalog-cutter/700/500', available: true },
    { id: 12, title: 'Línea de Lavado Vegetal', category: 'Procesamiento', description: 'Limpieza y desinfección continua de materia prima.', image: 'https://picsum.photos/seed/catalog-wash/700/500', available: true },
  ];

  get categories(): string[] {
    return [...new Set(this.products.map((product) => product.category))];
  }

  get filteredProducts(): CatalogProduct[] {
    let result = this.products.filter((product) => {
      const matchesSearch =
        this.searchTerm.trim().length === 0 ||
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        this.selectedCategory === 'all' || product.category === this.selectedCategory;

      const matchesAvailability = !this.onlyAvailable || product.available;

      return matchesSearch && matchesCategory && matchesAvailability;
    });

    result = [...result].sort((a, b) => {
      if (this.sortBy === 'name-desc') {
        return b.title.localeCompare(a.title);
      }
      return a.title.localeCompare(b.title);
    });

    return result;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.sortBy = 'name-asc';
    this.onlyAvailable = false;
  }
}
