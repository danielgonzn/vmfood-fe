import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
    private readonly seoService: SeoService
  ) {}

  heroSlides: HeroSlide[] = [
    {
      id: 1,
      badge: 'VM Food Import · Desde 2021',
      title: 'Importación y Distribución de Maquinaria para Procesamiento de Alimentos',
      subtitle: 'Acompañamiento técnico y respaldo internacional para plantas procesadoras de carnes y embutidos en Venezuela.',
      image: 'https://picsum.photos/seed/factory-main/1920/1080?blur=1'
    },
    {
      id: 2,
      badge: 'Misión y Respaldo Técnico',
      title: 'Soluciones de Alta Calidad con Soporte Especializado',
      subtitle: 'Reconocemos las necesidades de cada cliente y proponemos equipos con enfoque en productividad, continuidad operativa y rentabilidad.',
      image: 'https://picsum.photos/seed/factory-line/1920/1080?blur=1'
    },
    {
      id: 3,
      badge: 'Portafolio Integral',
      title: 'Maquinaria Alemana, Maquinaria China y Materias Primas No Cárnicas',
      subtitle: 'Embutidoras, molinos, hornos, sistemas de empaque, refrigeración, generadores y aditivos para líneas de alimentos.',
      image: 'https://picsum.photos/seed/factory-support/1920/1080?blur=1'
    }
  ];

  currentHeroSlide = 0;

  brandLogos: BrandLogo[] = [
    { id: 1, name: 'Handtmann', image: 'https://logo.clearbit.com/handtmann.com' },
    { id: 2, name: 'Treif', image: 'https://logo.clearbit.com/treif.com' },
    { id: 3, name: 'Poly-Clip', image: 'https://logo.clearbit.com/polyclip.com' },
    { id: 4, name: 'Marel', image: 'https://logo.clearbit.com/marel.com' },
    { id: 5, name: 'Multivac', image: 'https://logo.clearbit.com/multivac.com' },
    { id: 6, name: 'Bizerba', image: 'https://logo.clearbit.com/bizerba.com' },
    { id: 7, name: 'GEA', image: 'https://logo.clearbit.com/gea.com' },
    { id: 8, name: 'ULMA Packaging', image: 'https://logo.clearbit.com/ulmapackaging.com' }
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

  trustStats = [
    { label: 'Año de fundación', value: '2021' },
    { label: 'Líneas de solución', value: '4' },
    { label: 'Enfoque de soporte', value: 'Técnico' },
  ];

  purchaseSteps = [
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

    this.startHeroSlider();
    this.showPromoPopup = true;
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
}
