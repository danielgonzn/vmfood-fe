import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiAuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith(environment.backendBaseUrl)) {
    req = req.clone({
      withCredentials: true,
      setHeaders: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });
  }

  return next(req);
};
