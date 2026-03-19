import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from './shared/layout/header.component';
import { FooterComponent } from './shared/layout/footer.component';
import { UiLoadingService } from './core/services/ui-loading.service';
import { LoadingOverlayComponent } from './shared/ui/loading-overlay.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoadingOverlayComponent, AsyncPipe],
  template: `
    <app-header />

    <router-outlet />

    <app-footer />

    <app-loading-overlay
      [active]="(loading$ | async) ?? false"
      title="Cargando informacion"
      message="Espera unos segundos..."
    />
  `,
})
export class App {
  readonly loading$: Observable<boolean>;

  constructor(private readonly uiLoading: UiLoadingService) {
    this.loading$ = this.uiLoading.loading$;
  }
}
