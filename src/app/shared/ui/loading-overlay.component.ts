import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (active) {
      <div class="vm-loader-overlay fixed inset-0 z-[200] flex items-center justify-center" aria-live="polite" aria-busy="true">
        <div class="vm-loader-card px-7 py-6 min-w-[260px] text-center">
          <img
            src="/images/logo.png"
            alt="VM Food Import"
            class="vm-loader-logo mx-auto mb-4"
            referrerpolicy="no-referrer"
          >
          <p class="text-sm font-semibold text-black tracking-wide">{{ title }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ message }}</p>
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