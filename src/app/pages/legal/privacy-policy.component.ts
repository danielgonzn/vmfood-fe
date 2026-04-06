import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="min-h-screen bg-gray-50 pt-32 pb-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <a routerLink="/" class="inline-flex items-center gap-2 vm-nav-link mb-6">Volver al inicio</a>
        <article class="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
          <h1 class="text-3xl font-bold text-black mb-4">Aviso de Privacidad</h1>
          <p class="text-gray-600 mb-4">
            En VM Food Import protegemos los datos personales de clientes, proveedores y aliados comerciales.
            La información recopilada mediante formularios de contacto y canales comerciales se usa exclusivamente
            para gestionar solicitudes, cotizaciones, seguimiento técnico y comunicaciones relacionadas con nuestros servicios.
          </p>
          <h2 class="text-xl font-bold text-black mt-6 mb-2">Uso de la información</h2>
          <p class="text-gray-600 mb-4">
            Los datos de contacto se utilizan para responder requerimientos, validar necesidades de maquinaria y coordinar propuestas.
            No comercializamos datos personales con terceros.
          </p>
          <h2 class="text-xl font-bold text-black mt-6 mb-2">Seguridad y conservación</h2>
          <p class="text-gray-600 mb-4">
            Aplicamos medidas administrativas y tecnológicas para resguardar la información. Conservamos los datos el tiempo
            necesario para cumplir fines comerciales, legales y de servicio postventa.
          </p>
          <h2 class="text-xl font-bold text-black mt-6 mb-2">Contacto</h2>
          <p class="text-gray-600">
            Para ejercer derechos de acceso, rectificación o eliminación de datos, escribe a
            <a href="mailto:info@vmfoodimport.com" class="text-vm-red font-semibold"> info@vmfoodimport.com</a>.
          </p>
        </article>
      </div>
    </section>
  `,
})
export class PrivacyPolicyComponent {}
