import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UiLoadingService } from '../services/ui-loading.service';

export const httpLoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(UiLoadingService);
  const shouldTrackRequest =
    req.url.startsWith(environment.apiBaseUrl) || req.url.startsWith(environment.backendBaseUrl);

  if (!shouldTrackRequest) {
    return next(req);
  }

  loading.start();
  return next(req).pipe(finalize(() => loading.stop()));
};