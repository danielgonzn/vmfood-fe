import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiLoadingService {
  private pendingRequests = 0;
  private showTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private hideTimeoutId: ReturnType<typeof setTimeout> | null = null;
  private readonly loadingState = new BehaviorSubject<boolean>(false);
  private readonly showDelayMs = 150;
  private readonly hideDelayMs = 200;

  readonly loading$: Observable<boolean> = this.loadingState.asObservable();

  start(): void {
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
      this.showTimeoutId = null;
    }

    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = null;
    }

    this.pendingRequests += 1;

    if (this.pendingRequests === 1) {
      this.showTimeoutId = setTimeout(() => {
        if (this.pendingRequests > 0) {
          this.loadingState.next(true);
        }

        this.showTimeoutId = null;
      }, this.showDelayMs);
    }
  }

  stop(): void {
    if (this.pendingRequests === 0) {
      return;
    }

    this.pendingRequests -= 1;

    if (this.pendingRequests === 0) {
      if (this.showTimeoutId) {
        clearTimeout(this.showTimeoutId);
        this.showTimeoutId = null;
      }

      this.hideTimeoutId = setTimeout(() => {
        if (this.pendingRequests === 0) {
          this.loadingState.next(false);
        }

        this.hideTimeoutId = null;
      }, this.hideDelayMs);
    }
  }
}