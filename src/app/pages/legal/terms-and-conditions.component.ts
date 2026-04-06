import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="min-h-screen bg-gray-50 pt-32 pb-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <a routerLink="/" class="inline-flex items-center gap-2 vm-nav-link mb-6">Volver al inicio</a>
        <article class="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h1 class="text-3xl font-bold text-black mb-4">Términos y Condiciones</h1>
          <p class="text-gray-600 mb-4">
            El contenido de este sitio tiene fines informativos y comerciales sobre maquinaria, repuestos y materias primas
            para la industria alimentaria. Las condiciones de venta, tiempos de entrega y disponibilidad final se confirman
            mediante cotización formal emitida por VM Food Import.
          </p>
          <h2 class="text-xl font-bold text-black mt-6 mb-2">Cotizaciones y disponibilidad</h2>
          <p class="text-gray-600 mb-4">
            Toda cotización puede variar según tipo de equipo, origen, costos logísticos, condiciones de importación y tasa aplicable.
            La disponibilidad de inventario está sujeta a confirmación al momento del pedido.
          </p>
          <h2 class="text-xl font-bold text-black mt-6 mb-2">Instalación y soporte</h2>
          <p class="text-gray-600 mb-4">
            Los alcances de instalación, puesta en marcha, garantía y soporte técnico se definen por producto y contrato.
          </p>
          <h2 class="text-xl font-bold text-black mt-6 mb-2">Responsabilidad</h2>
          <p class="text-gray-600">
            VM Food Import no se hace responsable por usos inadecuados de equipos o información técnica fuera de los lineamientos
            suministrados por el fabricante o por nuestro equipo especializado.
          </p>
        </article>
      </div>
    </section>
  `,
})
export class TermsAndConditionsComponent {}
