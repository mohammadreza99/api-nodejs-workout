import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorService } from '@core/utils';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error) {
          this.errorService.storeError({
            title: 'خطا',
            message: error.error.message,
          });
          if (error.status === 401) {
            localStorage.removeItem('token');
            setTimeout(() => {
              this.router.navigateByUrl('/auth/login');
            }, 2000);
          }
          return throwError(error);
        }
      })
    );
  }
  
  getErrorMessage(code: number): any {
    switch (code) {
      case 400: {
        return {
          title: `خطای ${code}`,
          message: 'درخواست صحیح نمی باشد و قابل پردازش نیست',
        };
      }
      case 401: {
        return {
          title: `خطای ${code}`,
          message: 'دوباره وارد سیستم شوید',
        };
      }
      case 403: {
        return {
          title: `خطای ${code}`,
          message: 'اجرای درخواست مورد نظر برای شما امکان ندارد',
        };
      }
      case 404: {
        return {
          title: `خطای ${code}`,
          message: 'درخواست مورد نظر وجود ندارد',
        };
      }
      case 405: {
        return {
          title: `خطای ${code}`,
          message: 'متد استفاده شده برای درخواست مجاز نیست',
        };
      }
      case 422: {
        return {
          title: `خطای ${code}`,
          message: 'خطا در پردازش فیلدها',
        };
      }
      case 500: {
        return {
          title: `خطای ${code}`,
          message: 'خطا سمت سرور رخ داده است',
        };
      }
      default: {
        return {
          title: `خطا`,
          message: 'خطای ناشناس، امکان ارتباط با سرور وجود ندارد',
        };
      }
    }
  }
}
