import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (active) {
      <div class="fixed inset-0 z-[200] bg-black/30 backdrop-blur-[1px] flex items-center justify-center" aria-live="polite" aria-busy="true">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-200 px-6 py-5 flex items-center gap-4 min-w-[240px]">
          <div class="vm-spinner" aria-hidden="true"></div>
          <div>
            <p class="text-sm font-semibold text-black">{{ title }}</p>
            <p class="text-xs text-gray-500">{{ message }}</p>
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