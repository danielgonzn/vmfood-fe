import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-black text-white py-12 border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-6 md:mb-0">
            <span class="font-montserrat font-bold text-2xl tracking-tighter">
              VM FOOD <span class="text-vm-red">IMPORT</span>
            </span>
            <p class="text-gray-500 text-sm mt-2">Tecnología para la industria alimentaria.</p>
          </div>

          <div class="flex space-x-6 mb-6 md:mb-0">
            <a routerLink="/aviso-de-privacidad" class="vm-footer-link">Aviso de Privacidad</a>
            <a routerLink="/terminos-y-condiciones" class="vm-footer-link">Términos y Condiciones</a>
          </div>

          <div class="text-gray-500 text-sm">
            &copy; {{ currentYear }} VM Food Import. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
