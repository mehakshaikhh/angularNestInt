import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
    .pipe(
      catchError((error:HttpErrorResponse) => {
        this.toastr.error(`Error Code: ${error.error.statusCode}`, `Message: ${error.error.message}`);
          this.authService.logout();
          this.router.navigate(['/login']);
        throw Error(error.error);
      })
    )
  }
}
