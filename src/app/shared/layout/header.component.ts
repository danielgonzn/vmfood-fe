import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <a class="flex-shrink-0 flex items-center cursor-pointer" [routerLink]="['/']" fragment="home">
            <span class="font-montserrat font-bold text-2xl tracking-tighter">
              VM FOOD <span class="text-vm-red">IMPORT</span>
            </span>
          </a>

          <div class="hidden md:flex space-x-8 items-center">
            <a [routerLink]="['/']" fragment="home" class="vm-nav-link">Inicio</a>
            <a [routerLink]="['/']" fragment="about" class="vm-nav-link">Nosotros</a>
            <a [routerLink]="['/']" fragment="products" class="vm-nav-link">Productos</a>
            <a [routerLink]="['/']" fragment="location" class="vm-nav-link">Ubicación</a>
            <a [routerLink]="['/']" fragment="contact" class="vm-btn-primary px-5 py-2 rounded-full">
              Contacto
            </a>
          </div>

          <div class="md:hidden flex items-center">
            <button type="button" class="text-gray-700 hover:text-vm-red" aria-label="Abrir menú">
              <mat-icon>menu</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class HeaderComponent {}
