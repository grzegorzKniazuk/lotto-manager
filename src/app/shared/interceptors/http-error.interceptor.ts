import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ErrorApiResponse } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';
import { ApiStatusCode } from 'src/app/shared/enums';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private readonly toastService: ToastService,
        private readonly router: Router,
    ) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                const { message, statusCode }: ErrorApiResponse = error.error;

                this.showErrorToast(message || error.message);

                this.redirectOnUnauthorized(statusCode);

                return throwError(error);
            }),
        );
    }

    private redirectOnUnauthorized(statusCode: number): void {
        if (statusCode === ApiStatusCode.UNAUTHORIZED) {
            this.router.navigateByUrl('login');
        }
    }

    private showErrorToast(message: string): void {
        this.toastService.error(message || 'Nieokreślony błąd');
    }
}
