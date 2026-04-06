import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="fixed top-0 w-full z-50 shadow-sm transition-all duration-300">
      <div class="bg-black text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4 text-xs">
          <div class="hidden lg:flex items-center gap-5 text-gray-200">
            <a href="mailto:info@vmfoodimport.com" class="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <mat-icon class="!text-sm">mail</mat-icon>
              info@vmfoodimport.com
            </a>
            <a [href]="'tel:+' + whatsappDial" class="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <mat-icon class="!text-sm">phone</mat-icon>
              {{ whatsappPhone }}
            </a>
            <span class="inline-flex items-center gap-1.5 text-gray-300">
              <mat-icon class="!text-sm">location_on</mat-icon>
              Los Teques, Miranda, Venezuela
            </span>
          </div>

          <a [href]="'tel:+' + whatsappDial" class="lg:hidden inline-flex items-center gap-1.5 text-gray-200 hover:text-white transition-colors">
            <mat-icon class="!text-sm">phone</mat-icon>
            {{ whatsappPhone }}
          </a>

          <div class="flex items-center gap-3 text-gray-200">
            <a href="https://www.instagram.com/vmfoodimport" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Instagram</a>
            <a href="https://www.facebook.com/vmfoodimport" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </div>

      <div class="bg-white/95 backdrop-blur-sm">
        <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            <a class="flex-shrink-0 flex items-center cursor-pointer" [routerLink]="['/']" fragment="home">
              <img src="/images/logo.png" alt="VM Food Import Logo" class="h-14 w-auto">
            </a>

            <div class="hidden md:flex space-x-8 items-center">
              <a [routerLink]="['/']" fragment="home" class="vm-nav-link">Inicio</a>
              <a [routerLink]="['/']" fragment="about" class="vm-nav-link">Nosotros</a>
              <a [routerLink]="['/catalogo']" class="vm-nav-link">Productos</a>
              <a [routerLink]="['/']" fragment="faq" class="vm-nav-link">FAQ</a>
              <a [routerLink]="['/']" fragment="location" class="vm-nav-link">Ubicación</a>
              <a [routerLink]="['/']" fragment="contact" class="vm-btn-primary px-5 py-2 rounded-full">
                Contacto
              </a>
            </div>

            <div class="md:hidden flex items-center">
              <button
                type="button"
                class="text-gray-700 hover:text-vm-red"
                (click)="toggleMobileMenu()"
                [attr.aria-expanded]="isMobileMenuOpen"
                aria-label="Abrir menú"
              >
                <mat-icon>{{ isMobileMenuOpen ? 'close' : 'menu' }}</mat-icon>
              </button>
            </div>
          </div>

          @if (isMobileMenuOpen) {
            <div class="md:hidden border-t border-gray-200 pt-3 pb-2 flex flex-col gap-1">
              <a [routerLink]="['/']" fragment="home" (click)="closeMobileMenu()" class="px-2 py-2 vm-nav-link">Inicio</a>
              <a [routerLink]="['/']" fragment="about" (click)="closeMobileMenu()" class="px-2 py-2 vm-nav-link">Nosotros</a>
              <a [routerLink]="['/catalogo']" (click)="closeMobileMenu()" class="px-2 py-2 vm-nav-link">Productos</a>
              <a [routerLink]="['/']" fragment="faq" (click)="closeMobileMenu()" class="px-2 py-2 vm-nav-link">FAQ</a>
              <a [routerLink]="['/']" fragment="location" (click)="closeMobileMenu()" class="px-2 py-2 vm-nav-link">Ubicación</a>
              <a [routerLink]="['/']" fragment="contact" (click)="closeMobileMenu()" class="mx-2 mt-2 vm-btn-primary px-4 py-2 text-center rounded-lg">Contacto</a>
            </div>
          }
        </div>
      </div>
    </nav>
  `,
})
export class HeaderComponent {
  readonly adminUrl = `${environment.backendBaseUrl}/admin`;
  readonly whatsappPhone = '+58 (412) 721-2203';
  readonly whatsappDial = '584127212203';

  isMobileMenuOpen = false;

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
