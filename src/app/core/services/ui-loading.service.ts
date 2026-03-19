import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UiLoadingService {
  private pendingRequests = 0;
  private readonly loadingState = new BehaviorSubject<boolean>(false);

  readonly loading$: Observable<boolean> = this.loadingState.asObservable();

  start(): void {
    this.pendingRequests += 1;

    if (this.pendingRequests === 1) {
      this.loadingState.next(true);
    }
  }

  stop(): void {
    if (this.pendingRequests === 0) {
      return;
    }

    this.pendingRequests -= 1;

    if (this.pendingRequests === 0) {
      this.loadingState.next(false);
    }
  }
}