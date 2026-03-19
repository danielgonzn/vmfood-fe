import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from './shared/layout/header.component';
import { FooterComponent } from './shared/layout/footer.component';
import { SiteMaintenanceConfigDto } from './core/models/api.models';
import { CatalogApiService } from './core/services/catalog-api.service';
import { UiLoadingService } from './core/services/ui-loading.service';
import { MaintenancePageComponent } from './pages/maintenance/maintenance-page.component';
import { LoadingOverlayComponent } from './shared/ui/loading-overlay.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoadingOverlayComponent, MaintenancePageComponent, AsyncPipe],
  template: `
    @if (maintenanceModeEnabled) {
      <app-maintenance-page [config]="maintenanceConfig" />
    } @else {
      <app-header />

      <router-outlet />

      <app-footer />
    }

    <app-loading-overlay
      [active]="(loading$ | async) ?? false"
      title="Cargando informacion"
      message="Espera unos segundos..."
    />
  `,
})
export class App implements OnInit {
  readonly loading$: Observable<boolean>;
  maintenanceModeEnabled = false;
  maintenanceConfig: SiteMaintenanceConfigDto = {
    enabled: false,
    title: 'Estamos construyendo algo extraordinario',
    subtitle: 'Nuestra nueva plataforma digital está en desarrollo. Pronto podrás explorar el catálogo más avanzado de maquinaria industrial para alimentos.',
    email: 'contacto@vmfoodimport.com',
    phone: '+58 412-7212203',
    address: 'Av. Pedro Russo Ferrer Local Nº23 Galpón B',
    whatsapp: '+58 412-7212203',
    logo_url: '/images/logo.png',
  };

  constructor(
    private readonly uiLoading: UiLoadingService,
    private readonly catalogApi: CatalogApiService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.loading$ = this.uiLoading.loading$;
  }

  ngOnInit(): void {
    this.catalogApi.getSiteConfig().subscribe({
      next: (response) => {
        this.maintenanceConfig = response.data.maintenance;
        this.maintenanceModeEnabled = !!response.data.maintenance.enabled;
        this.cdr.markForCheck();
      },
      error: () => {
        this.maintenanceModeEnabled = false;
        this.cdr.markForCheck();
      },
    });
  }
}
