import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SiteMaintenanceConfigDto } from '../../core/models/api.models';

@Component({
  selector: 'app-maintenance-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="top-accent"></div>
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>

    <main class="main-wrapper">
      <div class="logo-container">
        <div>
          <img width="250" [src]="logoUrl" alt="Logo VM Food Import" referrerpolicy="no-referrer">
        </div>
        <div class="logo-text">VM FOOD <span>IMPORT</span></div>
        <div class="divider"></div>
      </div>

      <h1>
        {{ config.title }}
      </h1>

      <p class="subtext">{{ config.subtitle }}</p>

      <div class="contact-section">
        <a [href]="'mailto:' + config.email" class="contact-card">
          <div class="icon-box">
            <span class="material-icons">mail</span>
          </div>
          <div class="contact-info">
            <h3>Escribenos</h3>
            <p>{{ config.email }}</p>
          </div>
        </a>

        <a [href]="'tel:' + onlyDigits(config.phone)" class="contact-card">
          <div class="icon-box">
            <span class="material-icons">phone</span>
          </div>
          <div class="contact-info">
            <h3>Llamanos</h3>
            <p>{{ config.phone }}</p>
          </div>
        </a>

        <div class="contact-card">
          <div class="icon-box">
            <span class="material-icons">location_on</span>
          </div>
          <div class="contact-info">
            <h3>Ubicacion</h3>
            <p>{{ config.address }}</p>
          </div>
        </div>
      </div>
    </main>

    <footer>
      &copy; {{ currentYear }} VM FOOD IMPORT. TODOS LOS DERECHOS RESERVADOS.
    </footer>

    <a [href]="whatsappHref" class="wa-float" target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
      <span class="material-icons">chat</span>
    </a>
  `,
  styles: [
    `
      :host {
        --vm-red: #d70000;
        --vm-black: #000000;
        --vm-white: #ffffff;
        --vm-gray-light: #f8f9fa;
        --whatsapp: #25d366;

        display: flex;
        flex-direction: column;
        min-height: 100vh;
        position: relative;
        overflow-x: hidden;
        background-color: var(--vm-white);
      }

      .top-accent {
        position: fixed;
        top: 0;
        width: 100%;
        height: 6px;
        background: var(--vm-red);
        z-index: 1000;
      }

      .bg-blob {
        position: absolute;
        background: var(--vm-gray-light);
        border-radius: 50%;
        z-index: 0;
        filter: blur(40px);
      }

      .blob-1 {
        width: 300px;
        height: 300px;
        top: -100px;
        right: -50px;
      }

      .blob-2 {
        width: 250px;
        height: 250px;
        bottom: -50px;
        left: -50px;
      }

      .main-wrapper {
        width: 100%;
        max-width: 1100px;
        padding: 40px 20px;
        margin: auto;
        text-align: center;
        position: relative;
        z-index: 1;
        animation: fadeIn 1s ease-out;
      }

      .logo-container {
        margin-bottom: 2rem;
      }

      .logo-text {
        font-family: 'Montserrat', sans-serif;
        font-weight: 900;
        font-size: clamp(2.2rem, 10vw, 4.5rem);
        letter-spacing: -2px;
        text-transform: uppercase;
      }

      .logo-text span {
        color: var(--vm-red);
      }

      .divider {
        width: 80px;
        height: 4px;
        background: var(--vm-red);
        margin: 15px auto;
        border-radius: 2px;
      }

      h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: clamp(1.4rem, 5vw, 2.8rem);
        margin-bottom: 1.5rem;
        font-weight: 700;
      }

      .subtext {
        font-size: clamp(1rem, 3vw, 1.2rem);
        color: #555;
        max-width: 700px;
        margin: 0 auto 3rem;
        padding: 0 10px;
      }

      .contact-section {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }

      .contact-card {
        background: #fff;
        padding: 25px;
        border-radius: 16px;
        text-decoration: none;
        color: inherit;
        border: 1px solid #eaeaea;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .contact-card:hover {
        border-color: var(--vm-red);
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
      }

      .icon-box {
        background: var(--vm-gray-light);
        padding: 12px;
        border-radius: 12px;
        color: var(--vm-red);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .icon-box .material-icons {
        font-size: 22px;
      }

      .contact-info h3 {
        font-size: 0.8rem;
        text-transform: uppercase;
        color: #999;
        margin-bottom: 2px;
        text-align: left;
      }

      .contact-info p {
        font-weight: 500;
        font-size: 0.95rem;
        text-align: left;
      }

      .wa-float {
        position: fixed;
        bottom: 25px;
        right: 25px;
        background: var(--whatsapp);
        color: white;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
        transition: transform 0.3s ease;
        z-index: 1000;
      }

      .wa-float:hover {
        transform: scale(1.1);
      }

      .wa-float .material-icons {
        font-size: 28px;
      }

      footer {
        padding: 20px;
        font-size: 0.75rem;
        color: #aaa;
        letter-spacing: 1px;
        text-align: center;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(15px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 400px) {
        .contact-card {
          flex-direction: column;
          text-align: center;
        }

        .contact-info p,
        .contact-info h3 {
          text-align: center;
        }
      }
    `,
  ],
})
export class MaintenancePageComponent {
  @Input() config: SiteMaintenanceConfigDto = {
    enabled: false,
    title: 'Estamos construyendo algo extraordinario',
    subtitle: 'Nuestra nueva plataforma digital está en desarrollo. Pronto podrás explorar el catálogo más avanzado de maquinaria industrial para alimentos.',
    email: 'contacto@vmfoodimport.com',
    phone: '+58 412-7212203',
    address: 'Av. Pedro Russo Ferrer Local Nº23 Galpón B',
    whatsapp: '+58 412-7212203',
    logo_url: '/images/logo.png',
  };

  readonly currentYear = new Date().getFullYear();

  get logoUrl(): string {
    return this.config.logo_url || '/images/logo.png';
  }

  get whatsappHref(): string {
    return `https://wa.me/${this.onlyDigits(this.config.whatsapp)}`;
  }

  onlyDigits(value: string): string {
    return value.replace(/\D+/g, '');
  }
}
