import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="fixed top-0 w-full z-50 shadow-sm transition-all duration-300">
      <div class="bg-black text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between gap-4 text-xs">
          <div class="hidden lg:flex items-center gap-5 text-gray-200">
            <a href="mailto:info@vmfoodimport.com" class="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <mat-icon class="!text-sm">mail</mat-icon>
              info@vmfoodimport.com
            </a>
            <a href="tel:+584120000000" class="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <mat-icon class="!text-sm">phone</mat-icon>
              +58 (412) 000-0000
            </a>
            <span class="inline-flex items-center gap-1.5 text-gray-300">
              <mat-icon class="!text-sm">location_on</mat-icon>
              Los Teques, Miranda, Venezuela
            </span>
          </div>

          <a href="tel:+584120000000" class="lg:hidden inline-flex items-center gap-1.5 text-gray-200 hover:text-white transition-colors">
            <mat-icon class="!text-sm">phone</mat-icon>
            +58 (412) 000-0000
          </a>

          <div class="flex items-center gap-3 text-gray-200">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Instagram</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </div>

      <div class="bg-white/95 backdrop-blur-sm">
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
              <a [routerLink]="['/']" fragment="faq" class="vm-nav-link">FAQ</a>
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
      </div>
    </nav>
  `,
})
export class HeaderComponent {}
