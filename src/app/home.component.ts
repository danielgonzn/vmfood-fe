import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  heroSlides: HeroSlide[] = [
    {
      id: 1,
      badge: 'Líderes en Maquinaria Industrial',
      title: 'Tecnología Industrial para el Procesamiento de Alimentos',
      subtitle: 'Importación de maquinaria de alta gama y materia prima para potenciar tu producción con estándares internacionales.',
      image: 'https://picsum.photos/seed/factory-main/1920/1080?blur=1'
    },
    {
      id: 2,
      badge: 'Innovación y Productividad',
      title: 'Equipos de Alto Desempeño para Operación Continua 24/7',
      subtitle: 'Soluciones robustas en acero inoxidable para procesos más eficientes, limpios y seguros en planta.',
      image: 'https://picsum.photos/seed/factory-line/1920/1080?blur=1'
    },
    {
      id: 3,
      badge: 'Respaldo Técnico',
      title: 'Acompañamiento Integral Desde la Compra Hasta la Puesta en Marcha',
      subtitle: 'Instalación, capacitación y soporte técnico especializado para mantener tu producción siempre activa.',
      image: 'https://picsum.photos/seed/factory-support/1920/1080?blur=1'
    }
  ];

  currentHeroSlide = 0;

  brandLogos: BrandLogo[] = [
    { id: 1, name: 'Marel', image: 'https://logo.clearbit.com/marel.com' },
    { id: 2, name: 'Multivac', image: 'https://logo.clearbit.com/multivac.com' },
    { id: 3, name: 'Bizerba', image: 'https://logo.clearbit.com/bizerba.com' },
    { id: 4, name: 'Handtmann', image: 'https://logo.clearbit.com/handtmann.com' },
    { id: 5, name: 'GEA', image: 'https://logo.clearbit.com/gea.com' },
    { id: 6, name: 'Ishida', image: 'https://logo.clearbit.com/ishida.com' },
    { id: 7, name: 'ULMA Packaging', image: 'https://logo.clearbit.com/ulmapackaging.com' },
    { id: 8, name: 'JBT', image: 'https://logo.clearbit.com/jbtc.com' }
  ];

  products: Product[] = [
    {
      id: 1,
      title: 'Empacadora al Vacío',
      description: 'Doble campana, acero inoxidable 304. Ideal para alta producción cárnica.',
      image: 'https://picsum.photos/seed/vacuum/600/400'
    },
    {
      id: 2,
      title: 'Mezcladora Industrial',
      description: 'Capacidad 200kg. Paletas reforzadas para masas densas y embutidos.',
      image: 'https://picsum.photos/seed/mixer/600/400'
    },
    {
      id: 3,
      title: 'Molino de Carne',
      description: 'Cabezal #32, motor 3HP. Alta eficiencia y bajo mantenimiento.',
      image: 'https://picsum.photos/seed/grinder/600/400'
    },
    {
      id: 4,
      title: 'Bobina de Plástico',
      description: 'Multicapa de alta barrera. Calibre ideal para termoformado.',
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

  private heroSliderIntervalId?: number;

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });

  currentYear = new Date().getFullYear();

  ngOnInit(): void {
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
