import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (active) {
      <div class="vm-loader-overlay fixed inset-0 z-[200] flex items-center justify-center px-4" aria-live="polite" aria-busy="true">
        <div class="vm-loader-glow"></div>

        <div class="vm-loader-strip relative w-full max-w-4xl px-4 py-8 text-center">
          <div class="vm-loader-logo-shell mx-auto mb-3">
            <img
              src="/images/logo.png"
              alt="VM Food Import"
              class="vm-loader-logo"
              referrerpolicy="no-referrer"
            >
          </div>

          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-vm-red/80 mb-1">VM Food Import</p>
          <p class="text-base font-bold text-black tracking-wide">{{ title }}</p>
          <p class="text-sm text-gray-500 mt-1">{{ message }}</p>

          <div class="vm-loader-progress mt-5 mx-auto" role="presentation">
            <span class="vm-loader-progress-bar"></span>
          </div>

          <div class="vm-loader-dots mt-4" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    }
  `,
})
export class LoadingOverlayComponent {
  @Input() active = false;
  @Input() title = 'Cargando';
  @Input() message = 'Estamos preparando el contenido...';
}