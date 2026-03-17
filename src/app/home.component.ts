import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WebContentDto } from './core/models/api.models';
import { CatalogApiService } from './core/services/catalog-api.service';
import { SeoService } from './shared/services/seo.service';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
}

interface BrandLogo {
  id: number;
  name: string;
  image: string;
}

interface BusinessFaq {
  question: string;
  answer: string;
}

interface TrustStat {
  label: string;
  value: string;
}

interface PurchaseStep {
  title: string;
  description: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly catalogApi: CatalogApiService,
    private readonly sanitizer: DomSanitizer,
    private readonly seoService: SeoService
  ) {}

  heroSlides: HeroSlide[] = [
    {
      id: 1,
      badge: 'VM Food Import · Desde 2021',
      title: 'Importación y Distribución de Maquinaria para Procesamiento de Alimentos',
      subtitle: 'Acompañamiento técnico y respaldo internacional para plantas procesadoras de carnes y embutidos en Venezuela.',
      image: '/images/banners/background1.JPG'
    },
    {
      id: 2,
      badge: 'Misión y Respaldo Técnico',
      title: 'Soluciones de Alta Calidad con Soporte Especializado',
      subtitle: 'Reconocemos las necesidades de cada cliente y proponemos equipos con enfoque en productividad, continuidad operativa y rentabilidad.',
      image: '/images/banners/background2.jpeg'
    },
  ];

  currentHeroSlide = 0;

  brandLogos: BrandLogo[] = [
    { id: 1, name: 'Handtmann', image: '/images/brands/handtmann.webp' },
    { id: 2, name: 'Treif', image: '/images/brands/treif.png' },
    { id: 3, name: 'Poly-Clip', image: '/images/brands/polyclip.svg' },
    { id: 4, name: 'Marel', image: '/images/brands/marel.ico' },
    { id: 5, name: 'Multivac', image: '/images/brands/multivac.png' },
    { id: 6, name: 'Bizerba', image: '/images/brands/bizerba.ico' },
    { id: 7, name: 'GEA', image: '/images/brands/gea.png' },
    { id: 8, name: 'ULMA Packaging', image: '/images/brands/ulma.png' }
  ];

  products: Product[] = [
    {
      id: 1,
      title: 'Maquinaria Alemana',
      description: 'Tecnología de prestigio como Handtmann, Treif y Poly-Clip para procesos de alto estándar.',
      image: 'https://picsum.photos/seed/vacuum/600/400'
    },
    {
      id: 2,
      title: 'Maquinaria Industrial China',
      description: 'Embutidoras, tumbler, cutters, molinos y líneas completas con excelente relación costo-beneficio.',
      image: 'https://picsum.photos/seed/mixer/600/400'
    },
    {
      id: 3,
      title: 'Equipamiento Complementario',
      description: 'Generadores, refrigeración, paneles frigoríficos, apiladores y transpaletas para operación integral.',
      image: 'https://picsum.photos/seed/grinder/600/400'
    },
    {
      id: 4,
      title: 'Materias Primas No Cárnicas',
      description: 'Tripas de colágeno y aditivos clave para formulaciones de embutidos y productos procesados.',
      image: 'https://picsum.photos/seed/plastic/600/400'
    }
  ];

  featuredProducts: Product[] = [
    {
      id: 101,
      title: 'Termoformadora Automática',
      description: 'Sistema continuo para empaque de alto volumen con control preciso de temperatura.',
      image: 'https://picsum.photos/seed/featured-thermo/800/600'
    },
    {
      id: 102,
      title: 'Embutidora Hidráulica',
      description: 'Rendimiento constante y construcción sanitaria para líneas de producción exigentes.',
      image: 'https://picsum.photos/seed/featured-stuffer/800/600'
    },
    {
      id: 103,
      title: 'Cutter Industrial',
      description: 'Corte homogéneo y seguro para optimizar tiempos en preparación y mezcla.',
      image: 'https://picsum.photos/seed/featured-cutter/800/600'
    },
    {
      id: 104,
      title: 'Túnel de Termoencogido',
      description: 'Acabado profesional para empaque secundario con eficiencia energética.',
      image: 'https://picsum.photos/seed/featured-tunnel/800/600'
    },
    {
      id: 105,
      title: 'Línea de Lavado de Vegetales',
      description: 'Sistema modular para limpieza, desinfección y escurrido de materia prima fresca.',
      image: 'https://picsum.photos/seed/featured-washline/800/600'
    },
    {
      id: 106,
      title: 'Dosificadora Volumétrica',
      description: 'Precisión de llenado para líquidos y semilíquidos en formatos de alta rotación.',
      image: 'https://picsum.photos/seed/featured-doser/800/600'
    },
    {
      id: 107,
      title: 'Etiquetadora Automática',
      description: 'Aplicación continua de etiquetas con ajuste rápido para múltiples presentaciones.',
      image: 'https://picsum.photos/seed/featured-labeler/800/600'
    },
    {
      id: 108,
      title: 'Marmita Industrial',
      description: 'Cocción uniforme con control térmico para salsas, mermeladas y preparados.',
      image: 'https://picsum.photos/seed/featured-kettle/800/600'
    },
    {
      id: 109,
      title: 'Selladora de Banda Continua',
      description: 'Sellado confiable y rápido para empaques de distintos calibres y materiales.',
      image: 'https://picsum.photos/seed/featured-sealer/800/600'
    },
    {
      id: 110,
      title: 'Báscula Multihead',
      description: 'Pesaje inteligente para optimizar rendimiento y reducir mermas en línea.',
      image: 'https://picsum.photos/seed/featured-multihead/800/600'
    }
  ];

  currentFeaturedSlide = 0;
  showPromoPopup = false;

  trustStats: TrustStat[] = [
    { label: 'Año de fundación', value: '2021' },
    { label: 'Líneas de solución', value: '4' },
    { label: 'Enfoque de soporte', value: 'Técnico' },
  ];

  purchaseSteps: PurchaseStep[] = [
    { title: 'Diagnóstico', description: 'Entendemos tu capacidad, proceso y objetivo de producción.' },
    { title: 'Propuesta técnica', description: 'Seleccionamos equipos y materias primas según requerimiento real.' },
    { title: 'Importación y entrega', description: 'Coordinamos suministro con respaldo de proveedores internacionales.' },
    { title: 'Puesta en marcha', description: 'Acompañamos instalación, arranque y soporte operativo.' },
  ];

  faqs: BusinessFaq[] = [
    {
      question: '¿Trabajan con equipos nuevos y usados?',
      answer: 'Sí. Ofrecemos opciones nuevas y usadas según el presupuesto y los objetivos del cliente.',
    },
    {
      question: '¿También suministran materias primas?',
      answer: 'Sí. Incluimos tripas de colágeno y aditivos no cárnicos como parte de la solución integral.',
    },
    {
      question: '¿Brindan acompañamiento técnico?',
      answer: 'Sí. Nuestro enfoque incluye asesoría técnica antes, durante y después de la compra.',
    },
  ];

  private heroSliderIntervalId?: number;

  aboutTitle = 'Aliado Estratégico para Plantas Procesadoras';
  aboutBody =
    'En VM Food Import nos dedicamos a la importación, comercialización y distribución de máquinas nuevas y usadas para el procesamiento de carnes y embutidos. Nuestra misión es contribuir al crecimiento de cada planta mediante acompañamiento técnico y soluciones de alta calidad.';
  missionBody =
    'Reconocer necesidades de producción y responder con maquinaria confiable, soporte técnico y respaldo de proveedores internacionales.';
  visionBody =
    'Ser el mejor aliado estratégico de nuestros clientes con propuestas de valor que impulsen su rentabilidad.';
  contactTitle = 'Conversemos sobre tu línea de producción';
  contactBody =
    'Cuéntanos capacidad, tipo de producto y objetivo. Te proponemos equipos y soluciones ajustadas a tu operación.';
  promoTitle = 'Promociones en Maquinaria Seleccionada';
  promoSubtitle = 'Descubre ofertas vigentes en equipos industriales y solicita asesoría para tu planta.';
  promoImage = 'https://picsum.photos/seed/promo-vmfood/1200/700';
  locationTitle = 'Visítanos';
  locationAddressTitle = 'Dirección Principal';
  locationAddressValue = 'Los Teques, Edo. Miranda. Venezuela';
  locationHoursTitle = 'Horarios de Atención';
  locationHoursValue = 'Lunes a Viernes: 8:00 AM - 5:00 PM | Sábados: 8:00 AM - 12:00 PM';
  locationPhoneTitle = 'Teléfonos';
  locationPhone1 = '+58 (412) 000-0000';
  locationPhone2 = '+58 (414) 000-0000';
  locationMapUrl = 'https://www.google.com/maps?q=Los%20Teques%2C%20Miranda%2C%20Venezuela&output=embed';
  safeLocationMapUrl!: SafeResourceUrl;

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.seoService.setMeta({
      title: 'VM Food Import | Maquinaria para Procesamiento de Alimentos',
      description:
        'Importación y distribución de maquinaria para carnes y embutidos en Venezuela. Soluciones industriales, soporte técnico y materias primas no cárnicas.',
      keywords:
        'VM Food Import, maquinaria para embutidos, maquinaria alemana, maquinaria china, equipos de empaque, aditivos alimentarios',
      url: 'https://vmfoodimport.com/',
      image: 'https://picsum.photos/seed/vmfood-og/1200/630',
    });

    this.seoService.setJsonLd('vmfood-org-schema', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'VM Food Import',
      url: 'https://vmfoodimport.com/',
      foundingDate: '2021-11',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Los Teques',
        addressRegion: 'Miranda',
        addressCountry: 'VE',
      },
    });

    this.refreshFaqSchema();

    this.startHeroSlider();
    this.showPromoPopup = true;
    this.safeLocationMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.locationMapUrl);
    this.loadCmsContent();
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.stopHeroSlider();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  goToHeroSlide(index: number): void {
    if (index < 0 || index >= this.heroSlides.length) {
      return;
    }

    this.currentHeroSlide = index;
    this.cdr.markForCheck();
  }

  nextHeroSlide(): void {
    this.currentHeroSlide = (this.currentHeroSlide + 1) % this.heroSlides.length;
    this.cdr.markForCheck();
  }

  prevHeroSlide(): void {
    this.currentHeroSlide = (this.currentHeroSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
    this.cdr.markForCheck();
  }

  nextFeaturedSlide(): void {
    this.currentFeaturedSlide = (this.currentFeaturedSlide + 1) % this.featuredProducts.length;
    this.cdr.markForCheck();
  }

  prevFeaturedSlide(): void {
    this.currentFeaturedSlide = (this.currentFeaturedSlide - 1 + this.featuredProducts.length) % this.featuredProducts.length;
    this.cdr.markForCheck();
  }

  goToFeaturedSlide(index: number): void {
    if (index < 0 || index >= this.featuredProducts.length) {
      return;
    }

    this.currentFeaturedSlide = index;
    this.cdr.markForCheck();
  }

  getFeaturedProduct(offset: number): Product {
    const total = this.featuredProducts.length;
    const index = (this.currentFeaturedSlide + offset + total) % total;
    return this.featuredProducts[index];
  }

  closePromoPopup(): void {
    this.showPromoPopup = false;
    this.cdr.markForCheck();
  }

  private startHeroSlider(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.stopHeroSlider();
    this.heroSliderIntervalId = window.setInterval(() => {
      this.nextHeroSlide();
    }, 6000);
  }

  private stopHeroSlider(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.heroSliderIntervalId) {
      window.clearInterval(this.heroSliderIntervalId);
      this.heroSliderIntervalId = undefined;
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      alert('Gracias por contactarnos. Nos pondremos en contacto pronto.');
      this.contactForm.reset();
    }
  }

  private loadCmsContent(): void {
    this.catalogApi.getWebContent().subscribe({
      next: (response) => {
        this.applyCmsContent(response.data);
        this.cdr.markForCheck();
      },
      error: () => {
        // Keep defaults when CMS content endpoint is unavailable.
      },
    });
  }

  private applyCmsContent(items: WebContentDto[]): void {
    const byKey = new Map(items.map((item) => [item.key, item]));

    const hero = byKey.get('home_hero');
    if (hero) {
      this.heroSlides[0] = {
        ...this.heroSlides[0],
        title: hero.title || this.heroSlides[0].title,
        subtitle: hero.subtitle || this.heroSlides[0].subtitle,
        badge: hero.name || this.heroSlides[0].badge,
        image: hero.banner_url || hero.image_url || this.heroSlides[0].image,
      };
    }

    const about = byKey.get('about_story');
    if (about) {
      this.aboutTitle = about.title || this.aboutTitle;
      this.aboutBody = about.body || this.aboutBody;
    }

    const mission = byKey.get('about_mission');
    if (mission) {
      this.missionBody = mission.body || this.missionBody;
    }

    const vision = byKey.get('about_vision');
    if (vision) {
      this.visionBody = vision.body || this.visionBody;
    }

    const contact = byKey.get('contact_main');
    if (contact) {
      this.contactTitle = contact.title || this.contactTitle;
      this.contactBody = contact.body || this.contactBody;
    }

    const promo = byKey.get('home_banner_top');
    if (promo) {
      this.promoTitle = promo.title || this.promoTitle;
      this.promoSubtitle = promo.subtitle || this.promoSubtitle;
      this.promoImage = promo.banner_url || promo.image_url || this.promoImage;
    }

    const heroSecondary = byKey.get('home_hero_secondary');
    if (heroSecondary) {
      this.heroSlides[1] = {
        ...this.heroSlides[1],
        title: heroSecondary.title || this.heroSlides[1].title,
        subtitle: heroSecondary.subtitle || this.heroSlides[1].subtitle,
        badge: heroSecondary.name || this.heroSlides[1].badge,
        image: heroSecondary.banner_url || heroSecondary.image_url || this.heroSlides[1].image,
      };
    }

    const processSteps = this.mapContentByPrefix(items, 'process_step_').map((item) => ({
      title: item.title || item.name,
      description: item.body || item.subtitle || '',
    }));
    if (processSteps.length > 0) {
      this.purchaseSteps = processSteps;
    }

    const stats = this.mapContentByPrefix(items, 'stat_').map((item) => ({
      label: item.title || item.name,
      value: item.subtitle || item.body || '-',
    }));
    if (stats.length > 0) {
      this.trustStats = stats;
    }

    const faqItems = this.mapContentByPrefix(items, 'faq_').map((item) => ({
      question: item.title || item.name,
      answer: item.body || item.subtitle || '',
    }));
    if (faqItems.length > 0) {
      this.faqs = faqItems;
      this.refreshFaqSchema();
    }

    const location = byKey.get('location_main');
    if (location) {
      this.locationTitle = location.title || this.locationTitle;
      this.locationAddressTitle = location.meta?.['address_title'] || this.locationAddressTitle;
      this.locationAddressValue = location.meta?.['address_value'] || this.locationAddressValue;
      this.locationHoursTitle = location.meta?.['hours_title'] || this.locationHoursTitle;
      this.locationHoursValue = location.meta?.['hours_value'] || this.locationHoursValue;
      this.locationPhoneTitle = location.meta?.['phone_title'] || this.locationPhoneTitle;
      this.locationPhone1 = location.meta?.['phone_1'] || this.locationPhone1;
      this.locationPhone2 = location.meta?.['phone_2'] || this.locationPhone2;
      this.locationMapUrl = location.meta?.['map_url'] || this.locationMapUrl;
      this.safeLocationMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.locationMapUrl);
    }
  }

  private mapContentByPrefix(items: WebContentDto[], keyPrefix: string): WebContentDto[] {
    return items
      .filter((item) => item.key.startsWith(keyPrefix))
      .sort((a, b) => a.sort_order - b.sort_order || a.id - b.id);
  }

  private refreshFaqSchema(): void {
    this.seoService.setJsonLd('vmfood-faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }
}
